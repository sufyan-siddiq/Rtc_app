import { Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Spinner, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
export const Post = () => {
    const toast = useToast()
    const { id } = useParams()
    const fetchPost = async () => {
        try {
            const url = `https://gorest.co.in/public/v1/posts/${id}`
            const data = await axios.get(url)
            return data
        }
        catch (err) {
            throw Error("Unable to fetch Post")
        }
    }
    const { data, isLoading } = useQuery(["post", id], fetchPost, {
        onError: (err) => {
            toast({ status: "error", title: err.message })
        }
    })
    console.log(data?.data?.data);
    if (isLoading) return <><Spinner /></>

    return (
        <div>

            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(600px, 1fr))'>
                <Card>
                    <CardHeader>
                        <Heading size='md'>
                            {data?.data?.data?.title}
                        </Heading>
                    </CardHeader>
                    <Heading size='md'>
                        User id :  {data?.data?.data?.user_id}
                    </Heading>
                    <CardBody>
                        <Text>
                            {data?.data?.data?.body}</Text>
                        <Text>
                            {data?.data?.data?.gender}
                        </Text>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </SimpleGrid>
        </div>
    )
}

