import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { BeatLoader } from "react-spinners"
import Error from "./Error"
import { useState } from "react"
import * as     Yup  from "yup"
  
const Login = () => {
    const[errors,setErrors]=useState([])
    const [formData, setFormData]= useState({
        email:"",
        password:"",
    })
    const handleInputChange = (e) => {
        const{name ,value} = e.target;
        setFormData((prevstate)=>({
            ...prevstate,
            [name]:value,
        }));
     };

     const handleLogin = async ()=>{
    setErrors([])
    try {
         const schema =  Yup.object().shape({
            email:Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
                 });
         await schema.validate( formData ,{abortEarly : false});
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
    <CardTitle>Login</CardTitle>
    <CardDescription> to your account if you already have one</CardDescription>
    <Error message={"some error"}/>
  </CardHeader>
  <CardContent className="space-y-2">
   <div className=" space-y-1">
<Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange}/>
{ errors.email &&  <Error message={errors.email}/>}
   </div>
   <div className=" space-y-1">
<Input name="password" type="password" placeholder="Enter Password" onChange={handleInputChange}/>
{ errors.password &&  <Error message={errors.password}/>}
   </div>
  </CardContent>
  <CardFooter>
 <Button onClick={handleLogin}>
    {true ? <BeatLoader size={10 } color="#36d7b7"/> : "Login" }
  
 </Button>
  </CardFooter>
</Card>

  )
}

export default Login
