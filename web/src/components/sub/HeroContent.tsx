"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

import { getRedirectResult, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const HeroContent = () => {
  const provider = new GoogleAuthProvider();

  const [userAuth, setUserAuth] = useState<any>(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        sessionStorage.setItem("userId",user.uid)
        setUserAuth(user);
        console.log(user)
        // sessionStorage.setItem("userEmail",user.email)
      } else {
        setUserAuth(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const signUp = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {
      const token = credential.accessToken;
      // Continue processing user data
    }
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  };

  const userSignout = () => {
    sessionStorage.clear()
    signOut(auth)
      .then(() => {
        console.log("Signout Success");
        sessionStorage.clear()
      })
      .catch((e) => console.log(e));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center md:px-20 px-10 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[10px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px] text-white">
            The most efficient Product Reviewer
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Find
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              the best{" "}
            </span>
            Product on the Market
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Know how good the product is right from the experience of the people
          who used it
        </motion.p>
        {!userAuth ? (
          <motion.button
            variants={slideInFromLeft(1)}
            onClick={signUp}
            className="py-3  button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
          >
            Sign Up with Google
          </motion.button>
        ) : (
          <motion.button
            variants={slideInFromLeft(1)}
            onClick={userSignout}
            className="py-3  button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
          >
            Sign out
          </motion.button>
        )}
        <motion.a
            variants={slideInFromLeft(1)}
            href="/history"
            className="py-3  button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
          >
            History
          </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image src="/homepg1.svg" alt="work icons" height={450} width={450} />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
