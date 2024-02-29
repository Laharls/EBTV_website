"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react";
import Link from "next/link"
import Image from "next/image";

const links = [
    { url: "/", title: "Home" },
    { url: "https://esportbros.tv/mentions-legales/", title: "Mention Légale" },
];

const socialLinks = [
    { url: "https://discord.gg/ebtv-splatoon", logo: "/discord.png" },
    { url: "https://www.twitch.tv/esportbrostv", logo: "/twitch.png" },
    { url: "https://twitter.com/esportbrostv", logo: "/twitter.png" },
    { url: "https://www.youtube.com/channel/UCfxjf8qf7UvdOuJxKvvaQ_A", logo: "/youtube.png" },
]

const Navbar = () => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = (e) => {
            if (open) {
                e.preventDefault();
                e.stopPropagation();
                e.returnValue = false;
                return false;
            }
        };

        if (open) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('scroll', handleScroll, { passive: false });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto';
        };
    }, [open]);

    const topVariants = {
        closed: {
            rotate: 0,
        },
        opened: {
            rotate: 45,
            backgroundColor: "rgb(255,255,255)"
        }
    };

    const centerVariants = {
        closed: {
            opacity: 1
        },
        opened: {
            opacity: 0
        }
    };

    const bottomVariants = {
        closed: {
            rotate: 0,
        },
        opened: {
            rotate: -45,
            backgroundColor: "rgb(255,255,255)"
        }
    };

    const listVariants = {
        closed: {
            x: "100vw"
        },
        opened: {
            x: "0",
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
            }
        }
    }

    const listItemVariants = {
        closed: {
            x: -10,
            opacity: 0
        },
        opened: {
            x: 0,
            opacity: 1
        }
    }

    return (
        <div className="h-full flex items-center justify-between bg-black px-4 sm:px-8 md:px-12 lg:px-20">
            <Link href="/">
                <div className="flex justify-center items-center gap-4">
                    <Image
                        src="/logo_sp3.webp"
                        alt=""
                        width={50}
                        height={50}
                        className="sm:hidden" />

                    <Image
                        src="/logo_sp3.webp"
                        alt=""
                        width={90}
                        height={90}
                        className="hidden sm:flex" />

                    <h1 className="text-md font-bold sm:text-xl md:text-3xl text-white">Ligue EBTV</h1>
                </div>
            </Link>


            {/* <div className="hidden text-white gap-4 md:flex">
                <div>Coucou</div>
                <div>Coucou</div>
                <div>Coucou</div>
            </div> */}

            <div className="hidden md:flex gap-4">
                <Link href="https://discord.gg/ebtv-splatoon" rel="noopener noreferrer" target="_blank" className="text-white">
                    <Image src="/discord.png" alt="" width={35} height={35} unoptimized/>
                </Link>
                <Link href="https://www.twitch.tv/esportbrostv" rel="noopener noreferrer" target="_blank" className="text-white">
                    <Image src="/twitch.png" alt="" width={35} height={35} unoptimized/>
                </Link>
                <Link href="https://twitter.com/esportbrostv" rel="noopener noreferrer" target="_blank" className="text-white">
                    <Image src="/twitter.png" alt="" width={35} height={35} unoptimized/>
                </Link>
                <Link href="https://www.youtube.com/channel/UCfxjf8qf7UvdOuJxKvvaQ_A" rel="noopener noreferrer" target="_blank" className="text-white">
                    <Image src="/youtube.png" alt="" width={35} height={35} unoptimized/>
                </Link>
            </div>

            <div className="md:hidden">
                {/*MENU BUTTON*/}
                <button className="w-10 h-8 flex flex-col justify-between z-50 relative" onClick={(() => setOpen(!open))}>
                    <motion.div variants={topVariants} animate={open ? "opened" : "closed"} className="w-10 h-1 bg-white rounded origin-left"></motion.div>
                    <motion.div variants={centerVariants} animate={open ? "opened" : "closed"} className="w-10 h-1 bg-white rounded"></motion.div>
                    <motion.div variants={bottomVariants} animate={open ? "opened" : "closed"} className="w-10 h-1 bg-white rounded origin-left"></motion.div>
                </button>
                {/*MENU BUTTON*/}
                {open && (
                    <motion.div variants={listVariants} initial="closed" animate="opened" className="absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl z-40">
                        {links.map(link => (
                            <motion.div variants={listItemVariants} key={link.title}>
                                <Link href={link.url} onClick={() => setOpen(false)}>{link.title}</Link>
                            </motion.div>
                        ))}

                        <div className="flex flex-row gap-4">
                            {socialLinks.map(social => (
                                <motion.div variants={listItemVariants} key={social.logo}>
                                    <Link href={social.url} onClick={() => setOpen(false)} rel="noopener noreferrer" target="_blank" className="text-white"><Image src={social.logo} alt="" width={50} height={50} /></Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Navbar