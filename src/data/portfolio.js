import website_demo from "../assets/portfolio/website_demo.webp"
import education_system from "../assets/portfolio/education_system.webp"
import kafaa_landing_page from "../assets/portfolio/kafaa_landing_page.webp"
import nodewave from "../assets/portfolio/nodewave.webp"
import komune_app from "../assets/portfolio/komune_app.webp"
import persmaunira from "../assets/portfolio/persmaunira.webp"


const portfolio = [
    {
        img: website_demo,
        category: 'Slicing UI',
        title: 'Dream Agency',
        isPrivate: false,
        description:'Turning visuals into code with precision and efficiency for a seamless web experience.',
        link: 'https://dinn-dream-agency.vercel.app/',
    },
    {
        img: education_system,
        category: 'Web Development',
        title: 'Education System',
        isPrivate: true,
        description:'Create and develop educational system features such as grade transripts, assessments, multi-role etc.',
        link: '#',
    },
    {
        img: kafaa_landing_page,
        category: 'Web Development',
        title: 'Landing Page',
        isPrivate: true,
        description:'Create a landing page that can be managed dynamically from the admin page',
        link: '#',
    },
    {
        img: komune_app,
        category: 'Web Development',
        title: 'Social Media Management System',
        isPrivate: true,
        description:'Broadcast whatsapp message, create approval post, tracking post with Social Media API',
        link: '#',
    },
    {
        img: nodewave,
        category: 'Slicing UI',
        title: 'Nodewave',
        isPrivate: false,
        description:'Turning visuals into code with precision and efficiency for a seamless web experience.',
        link: 'https://nodewave-dinn.vercel.app/',
    },
    {
        img: persmaunira,
        category: 'Web Development',
        title: 'Persma UNIRA News Webpage',
        isPrivate: false,
        description:'Content management system to manage, create, edit, delete and post news with multi-role access. ',
        link: 'https://persmaunira.com',
    },
]

export default portfolio