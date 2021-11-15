import { TextField, Button } from '@mui/material';
import React, { useContext } from 'react';
import * as yup from 'yup'
import { Formik } from 'formik'
import { adminContext } from '../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';

const AddPage = () => {
    const history = useNavigate()

    const { addPhone } = useContext(adminContext)
    const schema = yup.object({
        name: yup.string().min(3, 'Минимум 3 символа').max(30, 'Максимум 30 символов').required('Данное поле обязательно для заполнения'),
        description: yup.string().min(10, 'Минимум 10 символов').max(255, 'Максимум 255 символов').required('Данное поле обязательно для заполнения'),
        image: yup.string().required('Данное поле обязательно для заполнения'),
        price: yup.number().min(3, 'Минимум 3 символа').required('Данное поле обязательно для заполнения'),
        color: yup.string().required('Данное поле обязательно для заполнения'),
        brand: yup.string().required('Данное поле обязательно для заполнения'),
        model: yup.string().min(1, 'Минимум 1 символ').max(30, 'Максимум 30 символов').required('Данное поле обязательно для заполнения'),
    })

    return (
        <div className="add-div">
            <h2>Добавить телефон</h2>
            <Formik
                validationSchema={schema}
                onSubmit={(phone) => {
                    addPhone(phone)
                    history('/')
                }}
                initialValues={{
                    name: "",
                    description: "",
                    image: "",
                    price: "",
                    color: "",
                    brand: "",
                    model: "",
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Название телефона"
                            type="text"
                            variant="standard"
                            name="name"
                            value={values.name}
                            error={!!errors.name && touched.name}
                            helperText={touched.name ? errors.name : ""}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Описание телефона"
                            type="text"
                            variant="standard"
                            name="description"
                            value={values.description}
                            error={!!errors.description && touched.description}
                            helperText={touched.description ? errors.description : ""}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Картинка телефона"
                            type="text"
                            variant="standard"
                            name="image"
                            value={values.image}
                            error={!!errors.image && touched.image}
                            helperText={touched.image ? errors.image : ""}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Цена телефона"
                            type="text"
                            variant="standard"
                            name="price"
                            value={values.price}
                            error={!!errors.price && touched.price}
                            helperText={touched.price ? errors.price : ""}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Цвет телефона"
                            type="text"
                            variant="standard"
                            name="color"
                            value={values.color}
                            error={!!errors.color && touched.color}
                            helperText={touched.color ? errors.color : ""}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Брэнд телефона"
                            type="text"
                            variant="standard"
                            name="brand"
                            value={values.brand}
                            error={!!errors.brand && touched.brand}
                            helperText={touched.brand ? errors.brand : ""}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Модель телефона"
                            type="text"
                            variant="standard"
                            name="model"
                            value={values.model}
                            error={!!errors.model && touched.model}
                            helperText={touched.model ? errors.model : ""}
                            onChange={handleChange}
                        />
                        <Button variant="contained" type="submit" color="success">Добавить телефон</Button>
                    </form>
                )}
            </Formik>
        </div >
    );
};

export default AddPage;