export default function SectionHeaders({ subHeader, mainHeader }) {
    return (
        <>
            <h3 className="uppercase text-gray-500 font-semibold">
                {subHeader}
            </h3>
            <h2 className="text-primary text-4xl font-bold italic">
                {mainHeader}
            </h2>
        </>
    )
}