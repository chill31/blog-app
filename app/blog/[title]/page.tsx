import Container from "@/components/body/Container"

export default async function Blog({ params }: { params: { title: string } }) {
    const formatedTitle = params.title.replaceAll("-", " ")
    const response = await fetch(process.env.URL + `/api/blogs/getBlogByTitle`, {
        method: "POST",
        body: JSON.stringify({ title: formatedTitle }),
    })
    const data = await response.json()

    if(response.ok) {
        return (
            <Container>
            {data}
            </Container>
        )
    }
    else if(response.status == 404) {
        return (
            <Container>
                <h1>404</h1>
                <p>Blog not found</p>
            </Container>
        )
    }
    else {
        return (
            <Container>
                <h1>500</h1>
                <p>Internal server error <br/> Error code: {data.errorCode}</p>
            </Container>
        )
    }
    
}