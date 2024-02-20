import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function pagination(){
    return <Pagination className="my-2">
        <PaginationContent>
            <PaginationItem>
                <PaginationPrevious className="bg-indigo-600 text-white" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink className="border-2 border-indigo-600" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationNext className="bg-indigo-600 text-white" />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
}