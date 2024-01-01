import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Card, CardHeader, Heading, useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
export const AddForm = () => {
    const toast = useToast()
    const addNewPost = async ({ title, body }) => {
        try {
            const url = "https://gorest.co.in/public/v2/users/2138536/posts"
            const data = await axios.post(url,
                { id: 331, userId: 331, title, body }, {
                headers: {
                    Authorization:
                        "Bearer 035c47b0dc19e8ed1f8d6b6ed14c7d22c35c0e0abd9c9913c18b839d00d8cc93"
                },
            })
            return data
        }
        catch (err) {
            throw Error("Unable to fetch Posts")
        }
    }
    const initialValues = {
        id: 100123232,
        title: "",
        body: ""
    }
    const { data, error, mutateAsync } = useMutation(["addnewpost"], addNewPost, {
        onError: (err) => {
            toast({ status: "error", title: err.message })
        }
    })
    console.log(data)
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            await mutateAsync({ title: values.title, body: values.body })
        },
    });
    if (error) return <>{error.message}</>
    console.log(formik.values)
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Card>
                    <CardHeader>
                        <Heading size='md'>
                            Add New Post
                        </Heading>
                    </CardHeader>
                </Card>
                <input
                    id='title'
                    name='title'
                    placeholder='title'
                    type='title'
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <input
                    id='body'
                    name='body'
                    placeholder='body'
                    type='body'
                    onChange={formik.handleChange}
                    value={formik.values.body}
                />
                <button >post</button>
            </form>
        </div>
    )
}

