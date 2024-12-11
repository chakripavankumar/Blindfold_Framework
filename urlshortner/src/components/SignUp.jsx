import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { BeatLoader } from "react-spinners"
import Error from "./Error"
import { useEffect, useState } from "react"
import * as     Yup  from "yup"
import UseFetch from "@/hooks/use-Fetch"
import { signup } from "@/Db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/context"
  
const SignUp = () => {
 
    const[errors,setErrors]=useState([])
    const [formData, setFormData]= useState({
        name:" ",
        email:"",
        password:"",
        profile_pic:null,
    })

    const navigate = useNavigate();
    let [searchParams]= useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const{name ,value,files} = e.target;
        setFormData((prevstate)=>({
            ...prevstate,
            [name]:files?files[0] :value,
        }));
     };
     const {data,error,loading,fn:fnsignup}=UseFetch(signup,formData);
     const {fetchUser} = UrlState();
     useEffect(()=>{
        
        if( error === null && data){
                 navigate(`/dashboard ?${longLink ? `createNew=${longLink}`: ""}`);
              fetchUser();
        }

     },[loading, error])
     const handleSignUp = async ()=>{
    setErrors([])
    try {
         const schema =  Yup.object().shape({
            name:Yup.string().required("Name is required"),
            email:Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
            profile_pic:Yup.mixed().required("Profile pic is required"),
                 });
         await schema.validate( formData ,{abortEarly : false});
         await fnsignup();

    } catch (e) {
         const newErros={};
         e?.inner?.forEach(err => {
            newErros[err.path]= err.message;
         });
         setErrors(newErros);
    }
     } 
  return (
    <Card>
  <CardHeader>
    <CardTitle>SignUp</CardTitle>
    <CardDescription> Create a new account if you already haven&rsquo;t already</CardDescription>
  { error &&  <Error message={error.message}/>}
  </CardHeader>
  <CardContent className="space-y-2">
  <div className=" space-y-1">
<Input name="name" type="text" placeholder="Enter name" onChange={handleInputChange}/>
{ errors.name &&  <Error message={errors.name}/>}
   </div>
   <div className=" space-y-1">
<Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange}/>
{ errors.email &&  <Error message={errors.email}/>}
   </div>
   <div className=" space-y-1">
<Input name="password" type="password" placeholder="Enter Password" onChange={handleInputChange}/>
{ errors.password &&  <Error message={errors.password}/>}
   </div>
   <div className=" space-y-1">
<Input name="profile_pic" type="file"  accept="image/*" onChange={handleInputChange}/>
{ errors.profile_pic &&  <Error message={errors.profile_pic}/>}
   </div>
  </CardContent>
  <CardFooter>
 <Button onClick={handleSignUp}>
    {loading ? <BeatLoader size={10 } color="#36d7b7"/> : "Create Account" }
  
 </Button>
  </CardFooter>
</Card>

  )
}

export default SignUp
