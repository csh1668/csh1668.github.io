import './../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

export default function MySidebar() {
    return (
        <>
        <div class="col-auto col-sm-1 col-md-3 col-lg-2 px-2 primary-color box-shadow">
            <div class="d-flex flex-column px-3 pt-2 text-basic-color min-vh-100">
                <div class="d-flex align-items-center pb-3  text-decoration-none">
                <i class="fs-3 bi-check-circle-fill text-highlight-color"></i><span class="fs-5 d-none d-sm-inline ms-2">Unsolved</span>
                </div>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                    <LinkElement to='/' icon='house' text='Home' />
                    <LinkElement to='/problems' icon='list-check' text='Problems' />
                    <LinkElement to='/community' icon='chat-dots' text='Community' />
                </ul>
            </div>
        </div>
        </>
    );
}

function LinkElement(props) {
    return (
        <li class="nav-item w-100 text-start">
            <Link to={props.to} class="nav-link px-0">
                <i class={"fs-5 bi-" + props.icon + " text-highlight-color"}></i><span class="ms-1 d-none d-sm-inline text-basic-color">{props.text}</span>
            </Link>
        </li>
    );
}