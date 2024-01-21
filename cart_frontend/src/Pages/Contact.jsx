import './Contact.css'
import { useMediaQuery } from '@mantine/hooks';
import {MdOutlineEmail} from 'react-icons/md'
import { Flex, TextInput, Textarea, Button, Text } from '@mantine/core';
import { BsGithub } from 'react-icons/bs';
import { useState } from 'react';
import { sendContactMessage } from '../api/contactService';


const Contact = () => {
    const isMobile = useMediaQuery('(max-width: 36em)');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [nameErrorText, setNameErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [messageErrorText, setMessageErrorText] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        setNameErrorText('');
    }

    const handleEmailChange = (event) => {
        const email = event.target.value;
        const isValid = validateEmail(email);
        setEmail(email);
        setEmailErrorText('');
        if(!isValid){
            setEmailErrorText('Please enter a valid email');
        }
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        setMessageErrorText('');
    }

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const sendMessage = async () => {
        if(name === ''){
            setNameErrorText('Please enter your name');
        }
        if(email === ''){
            setEmailErrorText('Please enter your email');
        }
        else if(!validateEmail(email)){
            setEmailErrorText('Please enter a valid email');
        }
        if(message === ''){
            setMessageErrorText('Please enter your message');
        }
        if(name === '' || email === '' || message === ''){
            return;
        }
        try {
            const res = await sendContactMessage({name, email, message});
            if(res.status){
                alert('Message sent successfully');
            }
            else{
                alert('Message not sent');
            }
            
        } catch (error) {
            console.error(error);
            alert('Message not sent');
        }

        

        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <div>
            <div className="contact_us_container">
                <div className="contact_us">
                    <div className="contact_us_left_section">
                        <Text fz={isMobile?'md':'xl'} fw={'normal'}>Contact Us</Text>
                        <Text fz={isMobile?'sm':'md'} fw={'normal'} className='subheader'>
                            You can contact us by filling the form, or reach out to us on social media.
                        </Text>
                        <Flex align='center' gap={'xs'} justify={'flex-start'} className='contact-email'>
                            <MdOutlineEmail  size={20}/>
                            <Text fz={isMobile ? 'sm' : 'md'} fw={'normal'} display={'inline-block'} style={{'flexGrow':0}}>
                                <a href="mailto:sauravbharti38@gmail.com">sauravbharti38@gmail.com</a>
                            </Text>
                        </Flex>
                        <Flex align='center' gap={'xs'} justify={'flex-start'} className='contact-social'>
                            <a href="https://github.com/sau45" target="_blank" rel='noreferrer'>
                                <BsGithub size={30}/>
                            </a>
                        </Flex>
                    </div>
                    <div className="contact_us_right_section">
                        <Text fz={isMobile?'md':'xl'} fw={'normal'}>Send us a message</Text>
                        <TextInput mt={'md'} className='details_text' size={isMobile?'sm':'md'} value={name} error={nameErrorText} onChange={handleNameChange} label="Name" placeholder="Enter your name" />
                        <TextInput mt={'md'} className='details_text' size={isMobile?'sm':'md'} value={email} error={emailErrorText} onChange={handleEmailChange} label="Email" placeholder="Enter your email" type='email'/>
                        <Textarea mt={'md'} minRows={4} className='details_text' size={isMobile?'sm':'md'} value={message} error={messageErrorText} onChange={handleMessageChange} label="Message" placeholder="Enter your message" />
                        <Button onClick={sendMessage} className='send_message_btn' fullWidth size={isMobile?'sm':'md'} variant="gradient" color="blue">Send message</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
