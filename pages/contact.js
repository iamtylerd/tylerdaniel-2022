import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Flex, Box, TextInput, Button, Title, Textarea } from '@mantine/core';

import Sidebar from '../components/sidebar';
import styles from '../styles/contact.module.scss';


export default function Contact(props) {
  const [success, setSuccess] = useState(false);
  const form = useForm({
    initialValues: { name: '', email: '', message: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const onSubmit = (prop) => {
    const { email, message, name } = prop;
    fetch("https://formsubmit.co/ajax/tylerdanielwork@gmail.com", {
      method: "POST",
      body: JSON.stringify({
          email,
          name,
          message,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((data) => data.json())
    .then((json) => setSuccess(json.success))
  }
  return (
    <div className="container">
      <Sidebar location="contact" />
      <div className={styles["form-container"]}>
        <Flex
          width="100%"
          mih={50}
          gap="lg"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <div className="contact-container">
          <Title order={1}>Contact</Title>
          </div>
          {!success ? <Flex>
          <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit(onSubmit)}>
              <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
              <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
              <Textarea label="Message" placeholder="Message" {...form.getInputProps('message')} />
              <div className={styles["submit-button"]} >
                <Button type="submit" color="gray" radius="md" size="md">
                  Submit
                </Button>
              </div>
            </form>
          </Box>
          </Flex> : <Title order={1}>Form submitted</Title>}
        </Flex>
      </div>
    </div>
  )
}