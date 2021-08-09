import React from 'react'
import {Link} from 'react-router-dom'
import {Pagination} from 'react-bootstrap'


function Paginate({pages, page, keyword = '', isAdmin = false}) {
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    console.log(pages)

    return (pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (

                    <Pagination.Item
                        active={x + 1 === page}
                        key={x + 1}
                    >
                        <Link
                            to={!isAdmin ?
                                `/?keyword=${keyword}&page=${x + 1}`
                                : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                            }
                        >
                            {x + 1}
                        </Link>
                    </Pagination.Item>
                ))}
            </Pagination>
        )
    )
}

export default Paginate