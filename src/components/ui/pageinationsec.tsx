import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Pageinationsection = ({ itemsperpage, currentpage, totalitem, setCurrentpage }: any) => {
    let pages = []
    for (let i = 1; i <= Math.ceil(totalitem / itemsperpage); i++) {
        pages.push(i)
    }

    const handlenxt = () => {

        if (currentpage < pages.length) {
            setCurrentpage(currentpage + 1)
        }
    }
    const handlepre = () => {
        if (currentpage > 1) {
            setCurrentpage(currentpage - 1)
        }
    }
    return (
        <>
        {
     totalitem>0 &&
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => handlepre()} className='cursor-pointer'/>
                </PaginationItem>
                <PaginationItem className='flex'>

                    {
                        pages.map((page, index) => (
                            <PaginationItem key={index} className={`${currentpage === page ? "text-white bg-primary rounded-lg" : ""} cursor-pointer`}>
                                <PaginationLink onClick={() => setCurrentpage(page)}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
                </PaginationItem>


                <PaginationItem>
                    <PaginationNext onClick={() => handlenxt()} className='cursor-pointer'/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    }
    </>
    )
}

export default Pageinationsection