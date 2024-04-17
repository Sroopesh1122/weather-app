
const Loader = () => {
    return (
        <>
            <div className='loader-wrapper flex-col'>
                <div className='loading-container relative'>

                    <svg stroke="currentColor" id='svg-sun' fill="currentColor" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M256 118a22 22 0 0 1-22-22V48a22 22 0 0 1 44 0v48a22 22 0 0 1-22 22zm0 368a22 22 0 0 1-22-22v-48a22 22 0 0 1 44 0v48a22 22 0 0 1-22 22zm113.14-321.14a22 22 0 0 1-15.56-37.55l33.94-33.94a22 22 0 0 1 31.11 31.11l-33.94 33.94a21.93 21.93 0 0 1-15.55 6.44zM108.92 425.08a22 22 0 0 1-15.55-37.56l33.94-33.94a22 22 0 1 1 31.11 31.11l-33.94 33.94a21.94 21.94 0 0 1-15.56 6.45zM464 278h-48a22 22 0 0 1 0-44h48a22 22 0 0 1 0 44zm-368 0H48a22 22 0 0 1 0-44h48a22 22 0 0 1 0 44zm307.08 147.08a21.94 21.94 0 0 1-15.56-6.45l-33.94-33.94a22 22 0 0 1 31.11-31.11l33.94 33.94a22 22 0 0 1-15.55 37.56zM142.86 164.86a21.89 21.89 0 0 1-15.55-6.44l-33.94-33.94a22 22 0 0 1 31.11-31.11l33.94 33.94a22 22 0 0 1-15.56 37.55zM256 358a102 102 0 1 1 102-102 102.12 102.12 0 0 1-102 102z"></path>
                        </g>
                    </svg>
                    <svg stroke="currentColor " id='svg-cloud' fill="currentColor"  viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"></path>
                        </g>
                    </svg>
                </div>
                <div className='mt-10 w-[300px]'>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>

                </div>
                <div>
                LOOKING OUTSIDE FOR YOU... ONE SEC
                </div>
            </div>

        </>
    )
}
export default Loader
