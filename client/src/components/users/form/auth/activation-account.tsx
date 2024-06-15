"use client";
import React, { useState } from 'react';
import { useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import CardWrapper from "./card-wrapper";
import {useDispatch} from "react-redux";
import { useRouter } from 'next/navigation';
import {useLocale } from 'next-intl';
import { activateAccount } from '@/redux/actions/auth';

const ActivationPage = () => {
  const [activation_code, setActivationCode] = useState('');
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const localActive = useLocale();
  const router = useRouter();
  const activation_token = searchParams.get('token');

  const handleActivation = () => {
    dispatch<any>(activateAccount({activation_code,activation_token},router,localActive))
  };

  return (
    <CardWrapper
      headerLabel="Activate Your Account"
      backButtonLabel={"Don't have an account? Sign up"}
      backButtonHref={"/sign-up"}
    >
      <div className="flex justify-center">
        <form className="space-y-2">
          <InputOTP
            maxLength={6}
            value={activation_code}
            onChange={(value: React.SetStateAction<string>) => setActivationCode(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm">
            {activation_code === "" ? (
              <>Enter your activation code.</>
            ) : (
              <>You entered: {activation_code}</>
            )}
          </div>
          <div className="p-4 flex justify-end relative left-[-40px]">
            <Button type="button" className="bg-blue-600 hover:bg-blue-500" onClick={handleActivation}>
              Activate
            </Button>
          </div>
        </form>
      </div>
    </CardWrapper>
  );
};

export default ActivationPage;