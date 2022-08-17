import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from "antd";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

function Edit() {

    const showToastSuccess = () => {
        toast.success('Success', {
            position: toast.POSITION.BOTTOM_CENTER
        });
    };

    const showToastError = () => {
        toast.error('Error', {
            position: toast.POSITION.BOTTOM_CENTER
        });
    };

    const navigate = useNavigate();
    const redirectToUsers = React.useCallback(() => navigate('/', { replace: true }), [navigate]); // redirection to users route

    const [data, setData] = React.useState(null); // stores current user's data

    // request for getting user by id
    async function getData() {
        const id = (/[^/]*$/.exec(`${window.location}`)[0]);
        axios.get(`https://gorest.co.in/public/v1/users/?id=${id}`)
            .then(response => {
                console.log("Status: ", response.status);
                console.log("Data: ", response.data);
                const data = response.data.data;
                setData(data[0])
            }).catch(error => {
                console.error('Something went wrong!', error);
            });
    }

    // request for saving changes in user's data
    async function postData(req) {
        axios.put(`https://gorest.co.in/public/v1/users/${data.id}`, req,
            { headers: { "Authorization": "Bearer af42c31289be9b232ef059762fec94ca86ef08802e1ba289ebb0b90ad8055712" } })
            .then(response => {
                console.log("Status: ", response.status);
                console.log("Data: ", response.data);
                showToastSuccess()
                redirectToUsers()
            }).catch(error => {
                console.error('Something went wrong!', error.message);
                showToastError()
            });
    }

    React.useEffect(() => {
        getData()
    }, []);

    const [form] = Form.useForm();

    const handleFormSubmit = () => {
        form.validateFields()
            .then((values) => {
                postData(values)
            })
            .catch((error) => {
                console.error('Something went wrong!', error.message);
            });
    };

    return (
        <div className="edit">
            <h1>Edit user data</h1>

            <div className="form">
                {data && <Form form={form} style={{ width: 500 }} layout="horizontal" labelCol={{ span: 4 }}>

                    <Form.Item initialValue={data.name} label="Name" name="name" rules={[{ required: true }]}>
                        <Input placeholder={data.name} />
                    </Form.Item>

                    <Form.Item initialValue={data.email} label="Email" name="email" rules={[{ required: true }]}>
                        <Input placeholder={data.email} />
                    </Form.Item>

                    <Form.Item initialValue={data.gender} label="Gender" name="gender" hasFeedback rules={[{ required: true }]}>
                        <Select placeholder={data.gender}>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item initialValue={data.status} label="Status" name="status" hasFeedback rules={[{ required: true }]}>
                        <Select placeholder={data.status}>
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                        </Select>
                    </Form.Item>

                    <div className="save-changes">
                        <Form.Item>
                            <Button onClick={handleFormSubmit} type="primary">
                                Save changes
                            </Button>
                        </Form.Item>
                    </div>

                </Form>}
            </div>
        </div>
    );
}

export default Edit;