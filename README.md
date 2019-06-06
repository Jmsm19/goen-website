# GOEN Website (Front & Back)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

| **Backend Testing** | **Frontend Testing** |
| ------------------- | -------------------- |
| None yet            | None yet             |

## Initial config

1. Install dependencies

   ```bash
   yarn setup
   ```

2. Create **.env** file by copying **.env.example** on both backend and frontend folders and alter as you need it.

3. Create an **APP KEY** by executing the following command:

   ```bash
   yarn back create adonis key:generate
   ```

  You can also install AdonisJs and run the command inside the backend folder.

## Deployment

The project has a continuous integration and deployment to Heroku using CircleCI.
You can check the .circleci/config.yml for more details regarding the process.

## Additional Resources

- AdonisJs: [https://adonisjs.com/docs/4.1/](https://adonisjs.com/docs/4.1/)
