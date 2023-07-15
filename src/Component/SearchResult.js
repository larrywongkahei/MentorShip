﻿import { useParams, Link, useNavigate } from 'react-router-dom';
import './SearchResultCss.css';
import { useEffect, useState } from 'react';
import APIService from '../APIService';

export default function SearchResult() {

    // To get all param
    const param = useParams();

    // To get dataToSearch param from all param
    const dataToSearch = param.searchdata

    // To store all projects fetched from backend
    const [projectsToShow, setProjectToShow] = useState([])

    // Fetch projects data from backend
    useEffect(() => {
        APIService.getProjectsBySearch(dataToSearch).then(data => setProjectToShow(data));
    }, [])

    // Search field input
    const [searchField, setSearchField] = useState("")

    // Search field input handler
    function searchFieldHandler(e){
        setSearchField(e.target.value)
    }

    // Search field submit button handler
    function searchFieldSubmit(e){
        e.preventDefault();
        window.location.pathname = `/searchResult/${searchField}`;
        setSearchField("")
    }

    // Project node
    const projects = projectsToShow.map((each, index) => {
        return (
            <div key={index} className='searchResultProjects'>
                <Link to={`/post/${each.id}`} className='titleLink'>
                    <h1>
                        {each.title}
                    </h1>
                </Link>
                <div className='ResultDetails'>
                    <div className='ResultDetailsTags'>
                        {each.tags.map((tag, index) => {
                            return (
                                <div className='ContentTags' key={index}>
                                <p className=''>
                                    {tag}
                                </p>
                            </div>
                            )
                        })}
                    </div>
                    <div className='ResultDetailRight'>
                        <img src={each.createdBy?.avatarUrl} />
                        <p>
                            {each.createdBy?.name}
                        </p>
                        <p>
                            {each.createdDate}
                        </p>
                    </div>
                </div>
            </div>

        )
    })

    return (
        <div className="searchResultContainer">
            <h1 className="title">
                Search Results
            </h1>
            <form>
                <input type="text" className="searchPageInput" value={searchField} onChange={searchFieldHandler}/>
                <input type='submit' style={{display:"none"}} onClick={searchFieldSubmit}/>
            </form>
            <h1 className='SearchResultTitle'>
                {projectsToShow.length} Search Results
            </h1>
            <div className="SearchResultDataContainer">
                <div className="eachResult">
                    {projects}
                </div>
            </div>
        </div>
    )
}