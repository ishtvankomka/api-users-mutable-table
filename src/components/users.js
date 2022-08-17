import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Pagination, Select } from "antd";
const { Option } = Select;

function Users() {
    const [data, setData] = React.useState(0); // stores users' data for table
    const [pagination, setPagination] = React.useState(1); // current page
    const [gender, setGender] = React.useState("male"); // current gender choice
    const [total, setTotal] = React.useState(0); // total pages for current gender

    const columns = [ 
        {
            title: 'Name',
            key: 'name',
            render: (record) => (
                <Link key={record.id} to={`/edit/${record.id}`} className="logo">
                    {record.name}
                </Link>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    // request for getting users by page and gender
    async function getData(pagination, gender) {  
        axios.get(`https://gorest.co.in/public/v1/users/?page=${pagination}&gender=${gender}`)
            .then(response => {
                const data = response.data.data;
                const total = response.data.meta.pagination.total;
                setData(data)
                setTotal(total)
                //console.log(data)
            }).catch(error => {
                console.error('Something went wrong!', error);
            });
    }

    // handles change of a page
    const handlePaginationChange = (value) => {
        setPagination(value);
        getData(value, gender);
    };

    // handles change of a gender
    const handleSelectChange = (value) => {
        setGender(value);
        getData(pagination, value)
    };

    React.useEffect(() => {
        getData(pagination, gender)
    }, [gender, pagination]);

    return (
        <div className="users">
            <div className="select-gender">
                <Select defaultValue={gender} style={{ width: 120 }} dropdownMatchSelectWidth={false} placement="bottomLeft" onChange={handleSelectChange} >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
            </div>

            <div className="table">
                <Table columns={columns} rowKey='id' dataSource={data} pagination={false} />
            </div>

            <div className="pagination">
                <Pagination onChange={handlePaginationChange} total={total} current={pagination} showSizeChanger={false} />
            </div>
        </div>
    );
}

export default Users;