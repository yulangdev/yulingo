import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function Copyright() {
  return (
    <Box mt={2} mb={3} ml={1}>
      <Typography variant="button">Frontend</Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        Javascript, React, Webpack, Metarial UI
      </Typography>
    
      <Typography variant="button">Backend</Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        Java, Spring Boot, JPA, MySQL
      </Typography>
    
      <Typography variant="button">Tools</Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        VSCode, Maven, NPM, Git
      </Typography>
    
      <Typography variant="button">E-mail</Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        <Link href='mailto:yulang.dev@gmail.com'>
          yulang.dev@gmail.com
        </Link>
      </Typography>
    
      <Typography variant="button">Github</Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        <Link href='https://github.com/yulangdev/yulingo' target='_blank'>
          https://github.com/yulangdev/yulingo
        </Link>
      </Typography>
</Box>
  );
}
