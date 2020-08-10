const proffys = [
    { name: "Diego Fernandes", 
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
    whatsapp: "89965784323", 
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject: "Química", 
    cost: "20", 
    weekday: [0], 
    time_from: [720], 
    time_to: [1220]
},
    { name: "Safira Bueno", 
    avatar: "https://alternemais.files.wordpress.com/2017/10/mulher-surtada.jpg?w=640", 
    whatsapp: "89990087654", 
    bio: "Quando criança, Safira adorava fazer experimentos com utensílios de cozinha.<br><br>Sua paixão por tudo que envolve ciência encanta a todos, mas sua maluquice pode deixar todo mundo com medo.", 
    subject: "Ciências", 
    cost: "20", 
    weekday: [1], 
    time_from: [720], 
    time_to: [1220]
    },
    { name: "Daniele Evangelista", 
    avatar: "https://d1e676vce0x2at.cloudfront.net/uploads/post/image/10887/main_destaqye.jpg", 
    whatsapp: "89990087654", 
    bio: "Amante do Barroco e Rococó.<br><br>Seu jeito de dar aula é explorar a criatividade dos seus alunos fazendo com que eles se sintam o próprio Caravaggio.", 
    subject: "Artes", 
    cost: "20", 
    weekday: [1], 
    time_from: [720], 
    time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query

   const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)

        proffys.push(data)

        return res.redirect("/study")
    }
    

    return res.render("give-classes.html", {subjects, weekdays })
}

const express = require('express')
const server = express()

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
.use(express.static("public"))
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)