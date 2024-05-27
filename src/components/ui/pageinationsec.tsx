import React from 'react'
import {
    Pagination,
    PaginationContent,
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
     totalitem>9 &&
        <Pagination className='flex justify-end'>
            <PaginationContent className=''>
                <PaginationItem >
                    <PaginationPrevious onClick={() => handlepre()} className='bg-primary text-white hover:bg-blue-800 hover:text-white cursor-pointer'/>
                </PaginationItem>
                <PaginationItem className='flex gap-1'>

                    {
                        pages.map((page, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink onClick={() => setCurrentpage(page)} className={`${currentpage === page ? "bg-blue-500 rounded-lg hover:bg-blue-700 cursor-pointer" : ""} cursor-pointer`}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
                </PaginationItem>


                <PaginationItem className='bg-primary text-white rounded-lg'>
                    <PaginationNext onClick={() => handlenxt()} className='bg-primary text-white hover:bg-blue-800 hover:text-white cursor-pointer'/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    }
    </>
    )
}

export default Pageinationsection