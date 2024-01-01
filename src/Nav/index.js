import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home/Home"
import { Post } from "../pages/Post/Post"

export const Nav = () => {
    return (
        <Router>
            <Routes>
                <Route path="/:id" exect element={<Home />} />
                <Route path="/post/:id" exect element={<Post />} />
            </Routes>
        </Router>
    )
}

