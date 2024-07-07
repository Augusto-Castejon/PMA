const { PrismaClient } = require("@prisma/client");
const httpStatus = require("http-status");

const prisma = new PrismaClient()

async function getAll(req, res) {
    try {

        const categories = await prisma.category.findMany()

        return res.status(httpStatus.OK).send(categories);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }
}

async function getById(req, res) {
    try {

        const activities = await prisma.category.findUnique({
            include: {
                user: true,
                category: true,
            },
            where:{
                id: parseInt(req.params.id)
            },
        });

        return res.status(httpStatus.OK).send(categories);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }
}


async function create(req, res) {
    try {
        const { description } = req.body;

        if (!description) {
            return res.status(httpStatus.BAD_REQUEST).send("O campo 'description' é obrigatório.");
        }

        const category = await prisma.category.create({
            data: {
                description: description,
            },
        });
        res.status(httpStatus.CREATED).send(category);
    } catch (error) {
        console.error(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição");
    }
}

async function update(req, res) {

    try {

        const category = await prisma.category.update({
            data: req.body,
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.CREATED).send(category);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não atualizado!");
    }

}

async function deleteEntity(req, res) {
    try {

        await prisma.activity.deleteMany({
            where: {
                categoryId: parseInt(req.params.id)
            }
        })

        const cat = await prisma.category.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).send("Categoria removida com sucesso!")

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não removido!");
    }
}

module.exports = { getAll, getById, create, update, deleteEntity }