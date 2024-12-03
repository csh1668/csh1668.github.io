<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>SeoHyeon's Calendar App PHP Version</title>

    <link rel="stylesheet" href="bootstrap.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="section.css">
    <link rel="stylesheet" href="table.css">
    <link rel="stylesheet" href="search.css">
    <link rel="stylesheet" href="result.css">
    <link rel="stylesheet" href="modal.css">
</head>
<body>
    <a type="button" class="btn btn-primary" id="moveToAddSchedule" href="add_schedule.html">
        일정 추가 페이지로 이동
    </a>

    <div class="container text-center wrapper">
        <div class="row">
            <!-- 1번째 열 -->
            <section class="col-md-5 col-lg order-md-1 order-lg-1 section-search text-white text-center">
                <div class="row pt-3">
                    <h2>Search</h2>
                </div>
                <form action="#" class="row">
                    <div class="input-group col col-lg-12 col-md-6">
                        <select name="select-month" class="form-select" id="form-select-month" onchange="update(this.value)">
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                    <div class="input-group col">
                        <input type="text" class="form-control" placeholder="Enter the keywords" aria-label="search-keyword" id="search-keyword" onchange="update()">
                    </div>
                    <div class="row">
                        <div class="input-group todo-types-wrapper pe-0">
                            <div class="col-lg-6">
                                <input class="form-check-input" type="checkbox" id="simple-search" onchange="update()">
                                <label for="simple-search">간단 메모</label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-check-input" type="checkbox" id="schedule-search" onchange="update()">
                                <label for="schedule-search">일정</label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-check-input" type="checkbox" id="assignment-search" onchange="update()">
                                <label for="assignment-search">과제</label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-check-input" type="checkbox" id="important-search" onchange="update()">
                                <label for="important-search">중요 </label>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <!-- 2번째 열 -->
            <div class="col-md-12 col-lg-7 order-md-3 order-lg-2 section-calendar">
                <div class="fw-bold fs-2 me-1 mt-1">
                    <span class="float-start">
                        <button type="button" class="btn btn-light" onclick="backwardMonth()">&lt;</button>
                    </span>
                    <span class="fw-normal fs-6 current-month">September</span> 2024
                    <span class="float-end">
                        <button type="button" class="btn btn-light" onclick="forwardMonth()">&gt;</button>
                    </span>
                </div>
                <div class="table-container text-start">
                    <div class="row week-header-wrapper text-center fw-light text-white">
                        <div class="col-week week-header">SUN</div>
                        <div class="col-week week-header">MON</div>
                        <div class="col-week week-header">THE</div>
                        <div class="col-week week-header">WED</div>
                        <div class="col-week week-header">THU</div>
                        <div class="col-week week-header">FRI</div>
                        <div class="col-week week-header">SAT</div>
                    </div>
                    <div class="row table-wrapper fw-bold">
                        <div class="col-week dummy"></div>
                        <div class="col-week dummy"></div>
                        <div class="col-week">1일
                            <ul>
                                <li>여행의 준비의 준비의 준비</li>
                                <li>여행의 준비</li>
                                <li>여행의 준비의 준비</li>
                            </ul>
                        </div>
                        <div class="col-week">이게 보이면 정상이 아닙니다</div>
                    </div>
                </div>
            </div>
            <!-- 3번째 열 -->
            <section class="col-md-7 col-lg order-md-2 order-lg-3 section-result text-white text-center">
                <div class="row pt-3">
                    <h2>Result</h2>
                </div>
                <form action="#" class="row">
                    <div class="input-group col col-lg-12">
                        <select name="select-todo" class="form-select" id="form-select-todo" onclick="onChangeListFilter()">
                            <option value="simple" selected>할일 목록</option>
                            <option value="important">별표 목록</option>
                        </select>
                    </div>
                </form>
                <div class="list-wrapper">
                    <div class="todolist">
                        <h6 class="text-center">To Do List</h6>
                        <ul class="text-start">
                            <li>수치프 과제<button class="toggle-star float-end" value="no">☆</button></li>
                            <li>웹프 텀프</li>
                            <li>기프랩 과제</li>
                            <li>컴구 과제</li>
                            <li>객지설 과제</li>
                            <li>동아리 팀프로젝트</li>
                        </ul>
                        <button class="btn btn-primary" id="done-button">완료</button>
                    </div>
                    <div class="donelist">
                        <h6 class="text-center">Done List</h6>
                        <ul class="text-start">
                            <li>웹프 과제</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <?php

    $scheduleFiles = glob("schedules/*.json");
    $schedules = [];

    

    ?>

</body>

</html>