import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2, User } from 'lucide-react';

import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';
import Modal from '../components/common/Modal.jsx';

import {
    addTrainer,
    deleteTrainer,
    getAllTrainers,
    updateTrainer
} from "../services/trainerService.js";


const emptyForm = {
    name: '',
    mobile: '',
    age: '',
    experience: '',
    address: '',
    photo: null
};


export default function TrainersManagement() {


    const [trainers, setTrainers] = useState([]);

    const [form, setForm] = useState(emptyForm);

    const [showForm, setShowForm] = useState(false);

    const [editingTrainer, setEditingTrainer] = useState(null);

    const [busy, setBusy] = useState(false);



    useEffect(() => {

        loadTrainers();

    }, []);



    const loadTrainers = async () => {

        try {

            const response = await getAllTrainers();

            setTrainers(response.data);


        } catch(error) {

            console.log("Trainer fetch error:", error);

        }

    };



    const closeForm = () => {

        setShowForm(false);

        setEditingTrainer(null);

        setForm(emptyForm);

    };



    const openAddForm = () => {

        setEditingTrainer(null);

        setForm(emptyForm);

        setShowForm(true);

    };



    const openEditForm = (trainer) => {


        setEditingTrainer(trainer);


        setForm({

            name: trainer.name || '',

            mobile: trainer.mobile || '',

            age: trainer.age || '',

            experience: trainer.experience || '',

            address: trainer.address || '',

            photo: trainer.photo || null

        });


        setShowForm(true);

    };



    const handlePhotoChange = (event)=>{


        const file = event.target.files[0];


        if(!file)
            return;


        setForm({

            ...form,

            photo:file

        });


    };




    const handleSubmit = async(event)=>{


        event.preventDefault();


        try {


            setBusy(true);



            const formData = new FormData();



            const trainerData = {


                name: form.name,

                mobile: form.mobile,

                age: Number(form.age),

                experience: form.experience,

                address: form.address

            };



            formData.append(

                "trainer",

                JSON.stringify(trainerData)

            );




            if(form.photo instanceof File){


                formData.append(

                    "photo",

                    form.photo

                );

            }





            if(editingTrainer){


                await updateTrainer(

                    editingTrainer.id,

                    formData

                );


            }
            else{


                await addTrainer(

                    formData

                );


            }





            await loadTrainers();


            closeForm();



        }
        catch(error){


            console.log(

                "Save trainer error",

                error

            );


            alert(

                "Unable to save trainer"

            );


        }
        finally{


            setBusy(false);


        }



    };






    const handleDelete = async(trainer)=>{


        if(window.confirm(`Delete ${trainer.name}?`)){


            try{


                await deleteTrainer(

                    trainer.id

                );


                await loadTrainers();


            }
            catch(error){


                console.log(error);


            }


        }


    };






    return (

        <DashboardLayout type="admin">


            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">


                <h1 className="text-4xl font-black">

                    Trainers Management

                </h1>



                <Button onClick={openAddForm}>

                    <Plus size={18}/>

                    Add Trainer

                </Button>


            </div>





            <div className="grid gap-5 md:grid-cols-3">


                {trainers.map((trainer)=>(


                    <Card key={trainer.id}>


                        {trainer.photo ?


                            <img

                                src={trainer.photo}

                                alt={trainer.name}

                                className="h-52 w-full rounded-2xl object-cover"

                            />

                            :

                            <span className="grid h-52 w-full place-items-center rounded-2xl bg-white/10">

                                <User size={48}/>

                            </span>

                        }




                        <h3 className="mt-4 text-xl font-black">

                            {trainer.name}

                        </h3>



                        <p className="text-brand-yellow">

                            {trainer.role || "Fitness Trainer"}

                        </p>




                        <p className="text-sm text-white/60">

                            Experience: {trainer.experience}

                        </p>



                        <p className="text-sm text-white/60">

                            Mobile: {trainer.mobile}

                        </p>



                        <p className="text-sm text-white/60">

                            Age: {trainer.age}

                        </p>



                        <p className="text-sm text-white/60">

                            {trainer.address}

                        </p>





                        <div className="mt-4 flex gap-2">


                            <button

                            onClick={()=>openEditForm(trainer)}

                            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">

                                <Pencil size={15}/>

                                Edit

                            </button>




                            <button

                            onClick={()=>handleDelete(trainer)}

                            className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-red-400">


                                <Trash2 size={15}/>

                                Delete


                            </button>


                        </div>



                    </Card>


                ))}



            </div>








            {showForm && (


                <Modal

                title={editingTrainer ? `Edit ${editingTrainer.name}` : "Add Trainer"}

                onClose={closeForm}

                wide>


                <form

                onSubmit={handleSubmit}

                className="grid gap-4 md:grid-cols-2">



                <input

                required

                placeholder="Trainer Name"

                value={form.name}

                onChange={(e)=>setForm({...form,name:e.target.value})}

                className="rounded-2xl bg-black/40 p-4"

                />




                <input

                required

                placeholder="Mobile Number"

                value={form.mobile}

                onChange={(e)=>setForm({...form,mobile:e.target.value})}

                className="rounded-2xl bg-black/40 p-4"

                />





                <input

                required

                type="number"

                placeholder="Age"

                value={form.age}

                onChange={(e)=>setForm({...form,age:e.target.value})}

                className="rounded-2xl bg-black/40 p-4"

                />





                <input

                required

                placeholder="Experience"

                value={form.experience}

                onChange={(e)=>setForm({...form,experience:e.target.value})}

                className="rounded-2xl bg-black/40 p-4"

                />





                <input

                required

                placeholder="Address"

                value={form.address}

                onChange={(e)=>setForm({...form,address:e.target.value})}

                className="rounded-2xl bg-black/40 p-4 md:col-span-2"

                />





                <input

                type="file"

                accept="image/*"

                onChange={handlePhotoChange}

                className="md:col-span-2"

                />





                <div className="flex justify-end gap-3 md:col-span-2">


                    <Button

                    type="button"

                    onClick={closeForm}>

                        Cancel

                    </Button>



                    <Button

                    type="submit"

                    disabled={busy}>


                        {busy ? "Saving..." : "Save Trainer"}


                    </Button>


                </div>



                </form>



                </Modal>


            )}



        </DashboardLayout>

    );

}