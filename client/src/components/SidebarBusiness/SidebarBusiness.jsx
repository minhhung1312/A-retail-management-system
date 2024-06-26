import React, { useState } from 'react';
import './SidebarBusiness.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faShirt, faBook, faList, faPeopleGroup, faBan, faUsers, faGlobe } from '@fortawesome/free-solid-svg-icons';

const SidebarAdmin = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [activeSubTabs, setActiveSubTabs] = useState({});

    const handleTabClick = (tab) => {
        if (activeTab === tab) {
            setActiveTab(null);
        } else {
            setActiveTab(tab);
        }
    };

    const handleSubTabClick = (subTab) => {
        setActiveSubTabs((prevState) => ({
            ...prevState,
            [activeTab]: prevState[activeTab] === subTab ? null : subTab
        }));
    };

    const tabs = [
        {
            name: 'Dashboard',
            path: '/business',
            icon: faChartSimple,
            subTabs: []
        },
        // {
        //     name: 'Warehouse',
        //     path: '/business/warehouse',
        //     icon: faCube,
        //     subTabs: [
        //         {
        //             name: 'Add Item',
        //             path: '/business/item/add'
        //         },
        //         {
        //             name: 'View Items',
        //             path: '/business/item/view'
        //         }
        //     ]
        // },
        {
            name: 'Product',
            path: '/business/product',
            icon: faShirt,
            subTabs: []
        },
        {
            name: 'Category',
            path: '/business/category',
            icon: faList,
            subTabs: []
        },
        {
            name: 'Order',
            path: '/business/order',
            icon: faBook,
            subTabs: []
        },
        {
            name: 'Customer',
            path: '/business/customer',
            icon: faPeopleGroup,
            subTabs: []
        },
        {
            name: 'Customer Blacklist',
            path: '/business/customer-blacklist',
            icon: faBan,
            subTabs: []
        },
        {
            name: 'Staff',
            path: '/business/employee',
            icon: faUsers,
            subTabs: []
        },
        {
            name: 'Website',
            path: '/business/website',
            icon: faGlobe,
            subTabs: []
        },

    ];

    return (
        <div className="sidebar-business-container">
            <div className="logo">Logo</div>
            <div className="sidebar-content">
                {tabs.map((tab, index) => (
                    <div key={index}>
                        <Link
                            to={tab.path}
                            className={`sidebar-tab ${activeTab === tab.name.toLowerCase() ? 'active' : ''}`}
                            onClick={() => handleTabClick(tab.name.toLowerCase())}
                        >
                            <FontAwesomeIcon icon={tab.icon} className="icon" />
                            <div className="text">{tab.name}</div>
                            {tab.subTabs.length > 0 && (
                                <FontAwesomeIcon
                                    icon={activeTab === tab.name.toLowerCase() ? 'angle-down' : 'angle-right'}
                                    className="sub-tab-arrow"
                                />
                            )}
                        </Link>
                        {activeTab === tab.name.toLowerCase() &&
                            tab.subTabs.map((subTab, subIndex) => (
                                <Link
                                    key={subIndex}
                                    to={subTab.path}
                                    className={`sub-tab ${activeSubTabs[tab.name.toLowerCase()] === subTab.name.toLowerCase() ? 'active' : ''}`}
                                    onClick={() => handleSubTabClick(subTab.name.toLowerCase())}
                                >
                                    <div className="text">{subTab.name}</div>
                                </Link>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidebarAdmin;

