import { useForm } from "react-hook-form";
import SectionTitle from "../components/common/SectionTitle.jsx";
import Card from "../components/common/Card.jsx";
import Button from "../components/common/Button.jsx";
import { addEnquiry } from "../services/enquiryService";

export default function Contact() {

  const {
    register,
    handleSubmit,
    reset
  } = useForm();



  const onSubmit = async(data)=>{

    try{


      await addEnquiry({

        name:data.name,

        mobile:data.phone,

        plan:data.plan,

        message:data.message

      });


      alert(
        "Enquiry submitted successfully!"
      );


      reset();


    }
    catch(error){


      console.log(error);


      alert(
        "Unable to submit enquiry."
      );


    }


  };



  return (

    <section className="px-4 py-16">

      <SectionTitle

        eyebrow="Contact"

        title="Send Gym Enquiry"

      />



      <Card className="mx-auto max-w-3xl">

        <form

          onSubmit={handleSubmit(onSubmit)}

          className="grid gap-4"

        >


          <input

            {...register("name",{

              required:true

            })}

            placeholder="Full Name"

            className="rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-brand-orange"

          />



          <input

            {...register("phone",{

              required:true

            })}

            placeholder="Phone Number"

            className="rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-brand-orange"

          />




          <select

            {...register("plan")}

            className="rounded-2xl border border-white/10 bg-black/40 p-4 outline-none"

          >

            <option>Monthly Plan</option>

            <option>3 Month Plan</option>

            <option>Yearly Plan</option>

          </select>




          <textarea

            {...register("message")}

            placeholder="Message"

            rows="5"

            className="rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-brand-orange"

          />



          <Button>

            Submit Enquiry

          </Button>


        </form>

      </Card>

    </section>

  );

}