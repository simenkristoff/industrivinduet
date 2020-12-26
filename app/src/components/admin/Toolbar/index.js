import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {checkUserIsAdmin} from './../../../utils';
import {FaArrowLeft} from 'react-icons/fa';

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const Toolbar = ({user}) => {
    const {currentUser} = useSelector(mapState);
    const [isAdminNamespace, setIsAdminNamespace] = useState(false);
    const location = useLocation();
    const isAdmin = checkUserIsAdmin(currentUser);

    useEffect(() => {
        const path = location.pathname;
        const regex = /^\/admin{1}/;

        if(isAdmin) {
            if(regex.test(path)) {
            setIsAdminNamespace(true);
            } else {
                setIsAdminNamespace(false);
            }
        }
    }, [location, isAdmin]);

    if(!isAdmin) return null;

    return (
        <div className="admin-toolbar">
            <div className="container-fluid">
                <ul>
                    {isAdminNamespace && (
                        <li className="return-to-page">
                            <Link to="/">
                                <FaArrowLeft />
                                <span>Tilbake til nettsiden</span>
                            </Link>
                        </li>
                    )}
                    <li>   
                        <Link to="/admin">
                            <span>Admin</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );

};

export default Toolbar;
