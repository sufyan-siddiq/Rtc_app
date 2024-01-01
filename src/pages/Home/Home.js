import { Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Spinner, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
export const Home = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const { id } = useParams()
    const pageId = parseInt(id)
    const fetchPosts = async () => {
        try {
            const url = `https://gorest.co.in/public/v1/posts?page=${pageId}`
            const data = await axios.get(url)
            return data
        }
        catch (err) {
            throw Error("Unable to fetch Posts")
        }
    }
    const { data, isLoading } = useQuery(["posts", pageId], fetchPosts, {
        keepPreviousData: true,
        onError: (err) => {
            toast({ status: "error", title: err.message })
        }
    })
    if (isLoading) return <><Spinner /></>

    return (
        <div>
            <Button onClick={() => {
                navigate(`/${pageId - 1}`)
            }}>Prev</Button>
            <Button onClick={() => {
                navigate(`/${pageId + 1}`)
            }}>Next</Button>
            {data?.data?.data?.map((post) => (
                <SimpleGrid key={post.id} spacing={4} templateColumns='repeat(auto-fill, minmax(600px, 1fr))'>
                    <Card>
                        <CardHeader>
                            <Heading size='md'>
                                {post.title}
                            </Heading>
                        </CardHeader>
                        <Heading size='md'>
                            User id :  {post.user_id}
                        </Heading>
                        <CardBody>
                            <Text>
                                {post.body}</Text>
                            <Text>
                                {post.gender}
                            </Text>
                        </CardBody>
                        <CardFooter>

                        </CardFooter>
                    </Card>
                </SimpleGrid>
            ))}
        </div>
    )
}

