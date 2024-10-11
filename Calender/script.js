let now = new Date();
let displayMonth = now.getMonth();

function planHandler() {
    this.plan_cnt = 0;
    this.plans = new Array(13);

    for (let i = 0; i < 13; i++) {
        this.plans[i] = new Array(32);
        for (let j = 0; j < 32; j++) {
            this.plans[i][j] = [];
        }
    }

    this.findPlan = (id) => {
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 32; j++) {
                for (let plan of this.plans[i][j]) {
                    if (plan.id === id) {
                        return plan;
                    }
                }
            }
        }
    }

    this.cancelModal = () => {
        let modal = document.getElementById("mymodal");
        modal.style.display = "none";
    };

    this.cancelModalReadonly = () => {
        let modal = document.getElementById("mymodal-readonly");
        modal.style.display = "none";
    }

    this.saveToLocalStorage = () => {
        localStorage.setItem("plans", JSON.stringify(this.plans));
        localStorage.setItem("plan_cnt", this.plan_cnt);
    }

    this.loadFromLocalStorage = () => {
        let plansLocal = localStorage.getItem("plans");
        let planCntLocal = localStorage.getItem("plan_cnt");

        if (plansLocal) {
            this.plans = JSON.parse(plansLocal);
        }
        if (planCntLocal) {
            this.plan_cnt = parseInt(planCntLocal);
        }
    }

    this.current = null;
    this.addPlan = () => {
        let planTitle = document.getElementById("plan-title").value;
        let planDesc = document.getElementById("plan-desc").value;
        let planTodo = document.getElementById("plan-todo").value;
        let planDay = this.current;
        
        this.plans[displayMonth][planDay].push({
            id: this.plan_cnt,
            title: planTitle,
            desc: planDesc,
            month: displayMonth,
            type: planTodo,
            day: planDay,
            stared: false,
            done: false
        })
        this.plan_cnt++;

        fillCalender(displayMonth);
        fillTodoList(displayMonth);

        this.saveToLocalStorage();
    };

    this.popPlan = (id) => {
        let plan = this.findPlan(id);
        let month = plan.month;
        let day = plan.day;
        let idx = this.plans[month][day].indexOf(plan);
        this.plans[month][day].splice(idx, 1);

        fillCalender(displayMonth);
        fillTodoList(displayMonth);

        this.saveToLocalStorage();

        return plan;
    }

    this.editPlan = () => {
        let planId = document.getElementById("mymodal-id").innerText;
        let plan = this.popPlan(parseInt(planId));

        let planTitle = document.getElementById("plan-title").value;
        let planDesc = document.getElementById("plan-desc").value;
        let planTodo = document.getElementById("plan-todo").value;
        let planDay = this.current;

        plan.title = planTitle;
        plan.desc = planDesc;
        plan.type = planTodo;
        plan.day = planDay;

        this.plans[displayMonth][planDay].push(plan);

        fillCalender(displayMonth);
        fillTodoList(displayMonth);

        this.saveToLocalStorage();

        
    }

    this.toggleStar = (id) => {
        let plan = this.findPlan(id);
        plan.stared = !plan.stared;

        this.saveToLocalStorage();
        fillTodoList(displayMonth);
    };

    this.toggleDone = (id) => {
        let plan = this.findPlan(id);
        plan.done = !plan.done;

        this.saveToLocalStorage();
        fillCalender(displayMonth);
        fillTodoList(displayMonth);
    }

    this.lastX = -1;
    this.lastY = -1;
    this.lastId = -1;
    this.showModal = (e, manualX = -1, manualY = -1, manualDay = -1) => {
        let modal = document.getElementById("mymodal");
        let planTitle = document.getElementById("plan-title");
        let planDesc = document.getElementById("plan-desc");
        let planTodo = document.getElementById("plan-todo");

        let modalWidth = window.getComputedStyle(modal).width;
        let modalHeight = window.getComputedStyle(modal).height;
        modalWidth = parseInt(modalWidth.substring(0, modalWidth.length - 2));
        modalHeight = parseInt(modalHeight.substring(0, modalHeight.length - 2));

        planTitle.value = "";
        planDesc.value = "";
        planTodo.childNodes.forEach((child) => {
            child.selected = false;
        });
        planTodo.childNodes[0].selected = true;

        if (manualDay === -1) {
            invoker = e.target;
            if (invoker.tagName.toUpperCase() === "SPAN") invoker = invoker.parentElement;
    
            this.current = invoker.firstElementChild.innerText;
            this.current = parseInt(this.current.substring(0, this.current.length - 1));
        } else {
            this.current = manualDay;
        }


        if (manualX === -1 || manualY === -1) {
            modal.style.left = Math.min(e.clientX + 15, window.innerWidth - modalWidth) + "px";
            modal.style.top = Math.min(e.clientY + 15, window.innerHeight - modalHeight) + "px";
        } else {
            modal.style.left = manualX + "px";
            modal.style.top = manualY + "px";
        }
        modal.style.display = "block";

        let saveButton = document.getElementById("add-plan");
        let editButton = document.getElementById("edit-plan");
        saveButton.hidden = false;
        editButton.hidden = true;
    };

    this.showModalReadonly = (e, id) => {
        let modal = document.getElementById("mymodal-readonly");
        let planTitle = document.getElementById("plan-title-readonly");
        let planDesc = document.getElementById("plan-desc-readonly");
        let planTodo = document.getElementById("plan-todo-readonly");

        let modalWidth = window.getComputedStyle(modal).width;
        let modalHeight = window.getComputedStyle(modal).height;
        modalWidth = parseInt(modalWidth.substring(0, modalWidth.length - 2));
        modalHeight = parseInt(modalHeight.substring(0, modalHeight.length - 2));

        let plan = this.findPlan(id);
        this.lastId = id;
        planTitle.innerText = plan.title;
        planDesc.innerText = plan.desc;
        switch (plan.type) {
            case "simple": planTodo.innerText = "간단 메모"; break;
            case "schedule": planTodo.innerText = "일정"; break;
            case "assignment": planTodo.innerText = "과제"; break;
            case "important": planTodo.innerText = "중요"; break;
        }

        this.lastX = Math.min(e.clientX + 15, window.innerWidth - modalWidth);
        this.lastY = Math.min(e.clientY + 15, window.innerHeight - modalHeight);

        modal.style.left = this.lastX + "px";
        modal.style.top = this.lastY + "px";
        modal.style.display = "block";
    };

    this.showModalEditMode = (e) => {
        this.cancelModalReadonly();
        let plan = this.findPlan(this.lastId);
        this.showModal(e, this.lastX, this.lastY, plan.day);

        this.current = plan.day;

        let modal = document.getElementById("mymodal");
        let planTitle = document.getElementById("plan-title");
        let planDesc = document.getElementById("plan-desc");
        let planTodo = document.getElementById("plan-todo");
        let modalId = document.getElementById("mymodal-id");
        modalId.innerText = this.lastId;

        planTitle.value = plan.title;
        planDesc.value = plan.desc;
        planTodo.childNodes.forEach((child) => {
            if (child.value === plan.type) child.selected = true;
            else child.selected = false;
        });

        let saveButton = document.getElementById("add-plan");
        let editButton = document.getElementById("edit-plan");
        saveButton.hidden = true;
        editButton.hidden = false;
    }

    this.removePlan = () => {
        this.popPlan(this.lastId);
    }

    this.moveToDoneList = () => {
        let todolist = document.getElementsByClassName("todolist")[0];
        todolist = todolist.getElementsByTagName("ul")[0];

        for (let child of todolist.children) {
            if (child.getElementsByClassName("todolist-checkbox")[0].checked) {
                let p = this.findPlan(parseInt(child.id));
                p.done = true;
            }
        }

        fillCalender(displayMonth);
        fillTodoList(displayMonth);
        this.saveToLocalStorage();
    }
}

let plan = new planHandler();

function fillCalender(month) {
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    month = parseInt(month);
    // 달력 테이블 초기화
    let table_wrapper = document.getElementsByClassName("table-wrapper")[0];
    table_wrapper.innerHTML = "";

    let firstDay = new Date(now.getFullYear(), month, 1);
    let lastDay = new Date(now.getFullYear(), month + 1, 0);
    // 더미 칸 채우기
    for (let i = 0; i < firstDay.getDay(); i++) {
        let dummy = document.createElement("div");
        dummy.className = "col-week dummy";
        table_wrapper.appendChild(dummy);
    }
    // 날짜 채우기
    let template = document.getElementById("calendar-element").content;
    for (let i = 1; i <= lastDay.getDate(); i++) {
        // 템플릿으로부터 복사
        let cur = document.importNode(template, true);
        cur = cur.children[0];
        let curDay = new Date(now.getFullYear(), month, i);
        let button = cur.getElementsByTagName("button")[0];
        let spans = cur.getElementsByTagName("span");
        let list = cur.getElementsByTagName("ul")[0];
        spans[0].innerText = `${i}일`;
        spans[1].innerText = `(${days[curDay.getDay()]})`;

        // 버튼에 이벤트 추가
        button.addEventListener("click", plan.showModal);

        // 오늘 날짜를 노란색으로 표시
        if (month === now.getMonth() && i === now.getDate())
            button.classList.add("today");
        // 토요일이라면 파란색으로 표시
        if ((firstDay.getDay() + i - 1) % 7 === 6)
            button.classList.add("saturday");
        // 일요일이라면 빨간색으로 표시
        if ((firstDay.getDay() + i - 1) % 7 === 0)
            button.classList.add("sunday");

        // 일정 추가
        let plans = plan.plans[month][i];
        for (let p of plans) {
            if (!searchFilter(p)) continue;

            let li = document.createElement('li');
            li.id = p.id;
            li.innerText = p.title;
            li.title = p.title;
            li.classList.add(p.type);
            li.classList.add('hover-pointer');

            if (p.done) li.classList.add('done');
            
            li.addEventListener('click', (e) => {
                plan.showModalReadonly(e, p.id);
            });

            list.appendChild(li);
        }

        table_wrapper.appendChild(cur);
    }

    // 텍스트 업데이트
    let formSelectMonth = document.getElementById("form-select-month");
    formSelectMonth.getElementsByTagName("option")[month].selected = true;
    let currentMonth = document.getElementsByClassName("current-month")[0];
    currentMonth.innerText =
        formSelectMonth.getElementsByTagName("option")[month].innerText;
}

function backwardMonth() {
    displayMonth--;
    if (displayMonth < 0) {
        displayMonth = 0;
        // 아무것도 안함
        return;
    }
    fillCalender(displayMonth);
    fillTodoList(displayMonth);
}

function forwardMonth() {
    displayMonth++;
    if (displayMonth > 11) {
        displayMonth = 11;
        // 아무것도 안함
        return;
    }
    fillCalender(displayMonth);
    fillTodoList(displayMonth);
}

function fillTodoList(month) {
    month = parseInt(month);
    let todoList = document.getElementsByClassName("todolist")[0];
    let doneList = document.getElementsByClassName("donelist")[0];
    todoList = todoList.getElementsByTagName("ul")[0];
    doneList = doneList.getElementsByTagName("ul")[0];
    let filter = shouldFilter();

    todoList.innerHTML = "";
    doneList.innerHTML = "";

    // 비어있다면 종료
    if (!plan.plans[month]) return;

    const template = document.getElementById('todolist-element').content;
    const templateDone = document.getElementById('donelist-element').content;
    for (let i = 1; i <= 31; i++) {
        if (!plan.plans[month][i]) continue;
        let plans = plan.plans[month][i];
        for (let p of plans) {

            if (!p.done) {
                if (filter && !p.stared) continue;

                let cur = document.importNode(template, true);
                cur = cur.children[0];
    
                let button = cur.getElementsByTagName('button')[0];
                button.addEventListener('click', () => {
                    plan.toggleStar(p.id);
                });
                
                cur.id = p.id;
                cur.childNodes[1].textContent = p.title;
                cur.title = `${p.month + 1}월 ${p.day}일`;
                cur.classList.add(p.type);
    
                if (p.stared) {
                    button.value = 'yes';
                    button.innerText = '★';
                }

    
                todoList.appendChild(cur);
            } else {
                let cur = document.importNode(templateDone, true);
                cur = cur.children[0];

                let radio = cur.getElementsByTagName('input')[0];
                radio.addEventListener('click', () => {
                    plan.toggleDone(p.id);
                })

                let button = cur.getElementsByTagName('i')[0];
                button.addEventListener('click', () => {
                    plan.popPlan(p.id);
                    fillCalender(displayMonth);
                    fillTodoList(displayMonth);
                    plan.saveToLocalStorage();
                })

                cur.id = p.id;
                cur.childNodes[1].textContent = p.title;
                cur.title = `${p.month + 1}월 ${p.day}일`;
                cur.classList.add(p.type);
                cur.classList.add('done');


                doneList.appendChild(cur);
            }


        }
    }
}

function shouldFilter() {
    let options = document.getElementById('form-select-todo');
    for (let o of options.children) {
        if (o.selected) {
            if (o.value === 'important') {
                return true;
            } else {
                return false;
            }
        }
    }
    return false;
}

function onChangeListFilter() {
    fillCalender(displayMonth);
    fillTodoList(displayMonth);
}

function update(month = -1) {
    if (month !== -1) {
        month = parseInt(month) - 1;
        displayMonth = month;
    }

    fillCalender(displayMonth);
    fillTodoList(displayMonth);
}

function searchFilter(p) {
    let kw = document.getElementById('search-keyword').value;
    let simple = document.getElementById('simple-search').checked;
    let schedule = document.getElementById('schedule-search').checked;
    let assignment = document.getElementById('assignment-search').checked;
    let important = document.getElementById('important-search').checked;
    let allUnchecked = !simple && !schedule && !assignment && !important;
    if (kw !== '') {
        let includes = p.title.includes(kw);
        if (allUnchecked) return includes;
        if (simple && p.type === 'simple') return includes;
        if (schedule && p.type === 'schedule') return includes;
        if (assignment && p.type === 'assignment') return includes;
        if (important && p.type === 'important') return includes;
        return false;
    } else {
        if (allUnchecked) return true;
        if (simple && p.type === 'simple') return true;
        if (schedule && p.type === 'schedule') return true;
        if (assignment && p.type === 'assignment') return true;
        if (important && p.type === 'important') return true;
        return false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    plan.loadFromLocalStorage();

    fillCalender(now.getMonth());
    fillTodoList(now.getMonth());
});
document.getElementById("cancel-plan").addEventListener("click", plan.cancelModal);
document.getElementById("cancel-plan-readonly").addEventListener("click", plan.cancelModalReadonly);
document.getElementById("update-plan-readonly").addEventListener("click", plan.showModalEditMode);
document.getElementById("delete-plan-readonly").addEventListener("click", () => {
    plan.removePlan();
    plan.cancelModalReadonly();
});

document.getElementById("add-plan").addEventListener("click", (e) => {
    plan.addPlan();
    plan.cancelModal();
});
document.getElementById("edit-plan").addEventListener("click", (e) => {
    plan.editPlan();
    plan.cancelModal();
});
document.getElementById("done-button").addEventListener("click", plan.moveToDoneList);
document.getElementById("search-keyword").addEventListener("input", (e) => {
    update();
});
document.getElementById("search-keyword").addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        update();
    }
})