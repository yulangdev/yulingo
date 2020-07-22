import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <Box mt={4} mb={3} ml={1}>
      <Typography variant='body2' color='textSecondary'>
        <b>E-mail:</b> <Link href='mailto:yulang.dev@gmail.com'>yulang.dev@gmail.com</Link><br />
        <b>Github:</b> <Link href='https://github.com/yulangdev/yulingo' target='_blank'>https://github.com/yulangdev/yulingo</Link><br />
        <b>Period:</b> 2020.06.16 ~ 2020.07.26<br />
        <b>Tech:</b> Spring Boot / React / Material UI / MySQL<br /><br />
        Copyright 2020. 유종원 All Rights Reserved.<br />
      </Typography>
    </Box>
  );
}
