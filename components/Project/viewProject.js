import React from 'react'
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import fetch from 'isomorphic-unfetch'

const viewProject = ({ projects }) => {

    console.log(projects.data)

    const [modalFormOpen, setModalFormOpen] = React.useState(false);
    const [modalSelected, setModalSelected] = React.useState(0);

    const handleShow = (index) => {
        setModalSelected(index);
        setModalFormOpen(true);
        console.log(index);
    }

    return (
        <div>
            <div className='flex items-center p-5 py-6'>
                <table className="mx-auto table-fixed">
                    <thead className='bg-slate-400'>
                        <tr>
                            <th className='px-3 py-3 border border-slate-600'>Project Name</th>
                            <th className='px-3 py-3 border border-slate-600'>Date Added</th>
                            <th className='px-3 py-3 border border-slate-600'>Client Name</th>
                            <th className='px-3 py-3 border border-slate-600'>Project Description</th>
                            <th className='px-3 py-3 border border-slate-600'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((project, index) => (
                            <tr key={project.id}>
                                <td className='px-3 py-3 border border-slate-300'>
                                    {project.attributes.Title}
                                </td>
                                <td className='px-3 py-3 border border-slate-300'>
                                    {project.attributes.DateAdded}
                                </td>
                                <td className='px-3 py-3 border border-slate-300'>
                                    {project.attributes.ClientName}
                                </td>
                                <td className='px-3 py-3 border border-slate-300'>
                                    {project.attributes.Description}
                                </td>
                                <td className='px-3 py-3 border border-slate-300'>
                                    <button className='p-2 m-2 text-white duration-300 bg-orange-600 rounded-lg shadow ring-2 ring-white ring-inset hover:bg-orange-700'
                                        type='submit'
                                        onClick={() => handleShow(index)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <Modal
                    key={projects.data[modalSelected].id}
                    className="flex justify-center py-5"
                    isOpen={modalFormOpen}
                    toggle={() => setModalFormOpen(false)} >

                    <div className=" modal-header">
                        <label className="inline-block px-10 py-3 mt-3 font-serif text-xl font-bold">Project Info</label>
                        <Button
                            color="secondary"
                            type="button"
                            onClick={() => setModalFormOpen(false)}>
                            Close
                        </Button>
                    </div>
                    <ModalBody>
                        <form className='flex-wrap p-0 px-3 modal-body'>
                            <label className="block px-1 py-1">
                                <span className="block font-medium text-md text-slate-700">Employee ID</span>
                                <input type="number" disabled className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                            </label>
                            <label className="block px-1 py-2">
                                <span className="block font-medium text-md text-slate-700">Project Name</span>
                                <input type="text" value={projects.data[modalSelected].attributes.Title} className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                            </label>
                            <label className="block px-1 py-2">
                                <span className="block font-medium text-md text-slate-700">Client Name</span>
                                <input type="text" value={projects.data[modalSelected].attributes.ClientName} className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                            </label>
                            <label className="block px-1 py-1">
                                <span className="block font-medium text-md text-slate-700">Date</span>
                                <input type="date" value={projects.data[modalSelected].attributes.DateAdded} className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                            </label>
                            <label className="block px-1 py-2">
                                <span className="block font-medium text-md text-slate-700">Project Description</span>
                                <textarea value={projects.data[modalSelected].attributes.Description} className="block h-56 px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                            </label>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className='p-2 m-2 text-white duration-300 bg-green-600 rounded-full shadow hover:bg-green-700' type='submit'>Save Changes </button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>

    )
}

export async function getServerSideProps() {
    const { API_URL } = process.env

    const res = await fetch(`${API_URL}/api/projects`)
    const data = await res.json()

    return {
        props: {
            projects: data
        }
    }
}

export default viewProject