/**
 * 백엔드 서버와의 통신을 담당하는 클래스
 */
class ApiHandler {
    // 싱글톤 패턴 적용
    constructor() {
        if (ApiHandler.instance) {
            return ApiHandler.instance;
        }

        this.userId = localStorage.getItem('userId') || null;
        this.baseUrl = 'http://localhost:8080/';
        // this.baseUrl = 'https://2129-121-183-216-65.ngrok-free.app/';

        ApiHandler.instance = this;
    }

    /**
     * 로그인할 사용자의 아이디를 저장하고, 로컬 스토리지에도 저장함
     * @param {String} userId 로그인할 사용자의 아이디
     */
    login(userId) {
        this.userId = userId;
        localStorage.setItem('userId', userId);
    }

    /**
     * 로그아웃하고, 로컬 스토리지에 저장된 사용자 아이디를 삭제함
     */
    logout() {
        this.userId = null;
        localStorage.removeItem('userId');
    }

    /**
     * 사용자가 로그인한 상태인지 확인
     * @returns bool
     */
    isLoggedIn() {
        return this.userId !== null;
    }

    /**
     * 백엔드 서버로부터 JSON 데이터를 요청
     * @param {String} url 
     */
    async requestJson(url) {
        const res = await fetch(url, {
            headers: new Headers({
                // ngrok에서 브라우저 경고를 무시하기 위한 헤더
                "ngrok-skip-browser-warning": "69420",
              }),
        }).catch((err) => {
            console.error("Failed to fetch data from " + url, err);
        })
        return await res.json();
    }

    /**
     * 충남대의 문제 풀이 현황을 요청
     */
    async requestSolvingStatus() {
        const url = `${this.baseUrl}problem-count`;
        return await this.requestJson(url).then((data) => {
            return {
                total: data.total,
                solved: data.solved
            };
        });
    }

    /**
     * 충남대의 백준 랭킹을 요청
     */
    async requestSchoolRanking() {
        const url = `${this.baseUrl}ranking`;

        return this.requestJson(url);
    }

    /**
     * 사용자가 풀지 않은 Daily Problem 요청
     */
    async requestDailyProblems(page, levelStart, levelEnd) {
        const url = `${this.baseUrl}recommended-problems?page=${page}&levelStart=${levelStart}&levelEnd=${levelEnd}&isAsc=false&searchMode=false&solvedByUser=false&userId=${this.userId ?? ''}`;
        return await this.requestJson(url);
    }

    /**
     * 사용자가 풀지 않은 무작위의 Daily Problem 하나를 요청
     */
    async requestSingleDailyProblem(levelStart, levelEnd) {
        const randPage = Math.floor(Math.random() * 100);
        return await this.requestDailyProblems(randPage, levelStart, levelEnd).then((data) => {
            return data.content[0];
        });
    }

    /**
     * 문제 번호로 문제 정보 요청
     */
    async requestProblem(problemId) {
        const url = `${this.baseUrl}problem/${problemId}`;
        return await this.requestJson(url);
    }

    /**
     * 해당 문제를 푼 사용자들의 정보 요청
     */
    async requestProblemUsers(problemId, page = 0) {
        const url = `${this.baseUrl}problem/${problemId}/users?page=${page}`;
        return await this.requestJson(url);
    }

    /**
     * 문제 검색 결과 요청
     */
    async requestProblemSearch(page, kw, levelStart, levelEnd, isAsc, userId, sort) {
        if (userId === "$onlyMe") {
            userId = "$onlyOneUser_" + this.userId;
        }

        kw = kw.replaceAll("#", "%23");
        const url = `${this.baseUrl}recommended-problems?page=${page}&levelStart=${levelStart}&levelEnd=${levelEnd}&isAsc=${isAsc}&searchMode=true&kw=${kw}&userId=${userId}&sort=${sort}`;
        return await this.requestJson(url).then((data) => {
            return {
                content: data.content,
                totalPages: data.page.totalPages,
                count: data.page.totalElements
            }
        });
    }

    /**
     * 커뮤니티 게시글 목록 요청
     */
    async requestPostList(page, sort, isAsc) {
        const url = `${this.baseUrl}post/list?page=${page}&sort=${sort}&isAsc=${isAsc}`;
        return await this.requestJson(url).then((data) => {
            return {
                content: data.content,
                totalPages: data.page.totalPages,
                count: data.page.totalElements
            }
        });
    }

    /**
     * 게시글 ID로 게시글 정보 요청 (댓글 포함)
     */
    async requestPost(postId) {
        const url = `${this.baseUrl}post/${postId}`;
        return await this.requestJson(url);
    }

    /**
     * 현재 사용자 정보로 게시글 작성
     */
    async addPost(title, content) {
        const url = `${this.baseUrl}post`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content,
                author: this.userId
            })
        }).catch((err) => {
            console.error("Failed to add post", err);
        });
        return res;
    }

    /**
     * 게시글 삭제
     */
    async deletePost(postId) {
        const url = `${this.baseUrl}post/${postId}`;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((err) => {
            console.error("Failed to delete post " + postId, err);
        });
        return res;
    }

    /**
     * 게시글 수정
     */
    async editPost(postId, title, content) {
        const url = `${this.baseUrl}post/${postId}`;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).catch((err) => {
            console.error("Failed to edit post " + postId, err);
        });
        return res;
    }

    /**
     * 게시글에 좋아요 요청
     */
    async likePost(postId) {
        const url = `${this.baseUrl}post/${postId}/like`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((err) => {
            console.error("Failed to like post " + postId, err);
        });
        return res;
    }

    /**
     * 해당 게시글에 댓글 추가
     */
    async addComment(postId, content) {
        const url = `${this.baseUrl}post/${postId}/comment`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                author: this.userId
            })
        }).catch((err) => {
            console.error("Failed to add comment to post " + postId, err);
        });
        return res;
    }

    /**
     * 댓글 삭제
     */
    async deleteComment(postId, commentId) {
        const url = `${this.baseUrl}post/${postId}/comment/${commentId}`;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((err) => {
            console.error("Failed to delete comment " + commentId + " from post " + postId, err);
        });
        return res;
    }

    /**
     * 댓글 수정
     */
    async editComment(postId, commentId, content) {
        const url = `${this.baseUrl}post/${postId}/comment/${commentId}`;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content
            })
        }).catch((err) => {
            console.error("Failed to edit comment " + commentId + " from post " + postId, err);
        });
        return res;
    }
}

const api = new ApiHandler();

export default api; // 싱글톤 객체를 외부로 노출