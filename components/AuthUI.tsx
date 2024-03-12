"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/app/contexts/authContext";
import { toast } from "sonner"

/**
 * AuthUI - Authentication for Login & Sign Up
 * @returns React.JSX.Element
 */
export default function AuthUI() {
  // Hooks for Sign Up
  const [emailCA, setEmailCA] = useState<string>("");
  const [passwordCA, setPasswordCA] = useState<string>("");
  // Hooks for Login
  const [emailL, setEmailL] = useState<string>("");
  const [passwordL, setPasswordL] = useState<string>("");

  const router = useRouter();
  const authContext = useContext(AuthContext);

  const logIn = async () => {
    const email = emailL;
    const password = passwordL;
    await authContext.login({ email, password });
    if (authContext.session) {
      router.push("/generator");
      toast("Successfully Logged In!")
    } else {
      toast("Failed to Log In", {description: "Please try again."});
    }
  };

  const signUp = async () => {
    const email = emailCA;
    const password = passwordCA;
    const supaClient = createClient();
    const { error } = await supaClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}s/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
      toast("Error while try to create account", {description: "Please try again."});
    }

    toast("Check Email to continue sign in process", {
      description: "We have sent you a mail, please check your inbox or spam folder.",});
  };


  useEffect(() => {
    if (authContext.session) {
      router.push("/generator");
    }
  }, [authContext.session, router])


  return (
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <Link
          href="/"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft size={15} />
            Back
          </div>
        </Link>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Login</TabsTrigger>
            <TabsTrigger value="password">Create Account</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  {`Login into existing account.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={emailL} onChange={(e) => setEmailL(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={passwordL} onChange={(e) => setPasswordL(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={logIn}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  {`Create a new account.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={emailCA} onChange={(e) => setEmailCA(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Password</Label>
                  <Input id="new" type="password" value={passwordCA} onChange={(e) => setPasswordCA(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={signUp}>Create Account</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}