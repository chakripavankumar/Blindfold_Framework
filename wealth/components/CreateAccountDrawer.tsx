"use client"
import { useForm} from "react-hook-form"
import { ReactNode, useState } from "react"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import {zodResolver} from "@hookform/resolvers/zod"
import { AccountSchema } from "@/app/lib/schema"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "./ui/switch"
import { Button } from "./ui/button"

interface CreateAccountDrawerPtops{
    children:ReactNode
}
const CreateAccountDrawer = ({children} :CreateAccountDrawerPtops) => {
    const [open,setOpen] =  useState(false);
 const{register , 
    handleSubmit ,
    formState:{errors},
    setValue,
    watch,
    reset}=   useForm({
    resolver :zodResolver(AccountSchema),
    defaultValues:{
        name: "",
        type:"CURRENT",
        balance:"",
        isDefault:false,
    },
    })
    const onsubmit= async (data)=>{
        console.log(data);
        
    }
    
  return (
    <Drawer open={open} onOpenChange={setOpen}>
    <DrawerTrigger asChild>{children}</DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Create New Account</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <form className="space-y-4 " onSubmit={handleSubmit(onsubmit)}> 
             <div className="space-y-2">
                <label
                className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
                htmlFor="name">
                Account Name
                </label>
                <Input 
                id="name" 
                placeholder="e.g, Main checking"
                {...register("name")}
                />
                {errors.name &&( 
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
          </div>
          <div className="space-y-2">
                <label className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
                htmlFor="type"> 
                Account Type
                </label>
                <Select 
                onValueChange={(value )  => setValue("type", value)}
                defaultValue={watch("type")}
                >
               <SelectTrigger id="type">
              <SelectValue placeholder="Select Type" />
               </SelectTrigger>
              <SelectContent>
             <SelectItem value="CURRENT">Current</SelectItem>
             <SelectItem value="SAVEINGS">Savings</SelectItem>
             </SelectContent>
              </Select>
                {errors.type &&( 
                    <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
          </div>
          <div className="space-y-2">
                <label className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
                htmlFor="balance"> 
                Initial balnce
                </label>
                <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
              />
                {errors.balance &&( 
                    <p className="text-sm text-red-500">{errors.balance.message}</p>
                )}
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="space-y-0.5">
                <label className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
                htmlFor="isDefault"> 
            Set as Default
                </label>
                <p className=" text-sm text-muted-foreground">This account  will  be slected by default for transactions</p>
                <Switch 
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault" , checked)}
                checked={watch("isDefault")}
                />
            
          </div>
          <div className="flex gap-4 pt-4">
            <DrawerClose asChild>
                <Button  type="button" variant="outline" className="flex-1">
                    Cancel
                </Button>
            </DrawerClose>
            <Button type="submit" className="flex-1">
                Create Account
            </Button>
          </div>
          </div>
          </form>
          </div>
    </DrawerContent>
  </Drawer>
  
  )
}

export default CreateAccountDrawer
