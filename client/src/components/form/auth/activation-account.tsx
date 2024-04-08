"use client"
 
import * as React from "react"
 
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import CardWrapper from "./card-wrapper"

const ActivationAccount = () => {
  const [value, setValue] = React.useState("")
  console.log("ActivationAccount",value)
  return (
  <CardWrapper
    headerLabel="Verify Your Account"
   backButtonLabel={"Don't have an account? signup"}
    backButtonHref={"/sign-up"}
    >
      <div className="flex justify-center">
      <form className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value:any) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>

      <div className="p-4 flex justify-end relative left-[-40px]">
      <Button type="submit">Submit</Button>
      </div>
    </form>
      </div>
    </CardWrapper>
  )
}

export default ActivationAccount