import { app } from '@shared/infra/http/app';

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server started! PORT -> ${port}`);
});
