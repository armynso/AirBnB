import './pageNotFound.css'

function PageNotFound() {
    return (
        <div>
            <h1 className='chessh1'>
                We are still working on the buttons :( <br></br>Wanna watch some chess instead? :)
            </h1>
            <div className='board'>
                <iframe src="https://lichess.org/tv/frame?theme=blue3&bg=dark"
                    width='460px' height='500px'></iframe>
            </div>
        </div>
    )
}

export default PageNotFound;
