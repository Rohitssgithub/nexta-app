"use client"
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import { loginUser } from '@/services/loginServices';
import { useRouter } from 'next/navigation';
function Login() {
    const router = useRouter()
    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required')
            .min(8, 'Should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    });
    return (
        <div className='container' style={{ marginTop: "100px" }}>
            <div className='row  justify-content-center'>
                <div className='col-3'>
                    <h3>Login</h3>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, { resetForm }) => {
                            try {
                                let call = async () => {
                                    let data = await loginUser(values)
                                    if (data) {
                                        router.push("/")
                                    }
                                }
                                call()
                                resetForm()


                            } catch (err) {

                            }
                        }}
                    >
                        {({ errors, touched, handleBlur, handleChange }) => (
                            <Form className='d-flex flex-column'>
                                <div>
                                    <label>Email:</label>
                                    <Field name="email" className="border border-dark  w-100" />    </div>
                                <div style={{ height: "30px", color: "red" }}>{errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}</div>

                                <div>
                                    <label>Password:</label>
                                    <Field name="password" className="border border-dark  w-100" type="password" />
                                </div>
                                <div style={{ height: "30px", color: "red" }}>  {errors.password && touched.password ? <div>{errors.password}</div> : null}
                                </div>
                                <div className='text-center'> <button type="submit" className='btn btn-primary'>Submit</button></div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login