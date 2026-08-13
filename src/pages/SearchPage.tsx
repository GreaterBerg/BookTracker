import { useState } from "react";
import { useQuery } from "@tanstack/react-query"
import useDebounce from "../hooks/useDebounce";
import fetchFn from "../fetchFn";
import NavBar from "../components/NavBar";
import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group"
import BookCard from "../components/BookCard";


const SearchPage = () => {

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    const { data: searchData, isLoading, error } = useQuery({
        queryKey: ["search", debouncedSearch],
        queryFn: () => fetchFn(`https://openlibrary.org/search.json?q=${debouncedSearch}`),
        enabled: !!debouncedSearch
    })

    
    return (
        <div>
            <NavBar />
            {/* <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="bg-gray-100 text-gray-900 p-2 rounded m-4 w-70 border border-gray-400 border-2"
            /> */}
            <InputGroup className="w-100 my-4 mx-[auto] text-[var(--white)]">
                <InputGroupInput
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..." />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
            <p className="text-sm text-start p-10">Results:</p>
            <div className="flex flex-wrap m-[0 auto] justify-center">
                { isLoading ? (
                    <p>loading...</p>
                ) : error ? (
                    <p>error {error.message}</p>
                ) : searchData?.docs.map((book: any) => (
                    <BookCard key={book.key} name={book.title} author={book.author_name} cover={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`} />
                ))}
            </div>
        </div>
    )
}

export default SearchPage