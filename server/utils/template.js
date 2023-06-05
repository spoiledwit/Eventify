const template = (data) => {
    return `<head>
    <style>
        body{
            width: 1500px;
            height: 1500px;
            margin: 0;
            padding: 0;

            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .container{
            width: 100%;
            height: 100%;
            background-image: url(${data.image || "https://i.ibb.co/3fd81K6/Untitled-design.png"});
            background-size: cover;
            background-position: center;
        }

        .content{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            color: aliceblue;
            
            box-sizing: border-box;
            padding: 100px;
        }

        h1{
            font-size: 60px;
            font-weight: 600;
        }

        p{
            font-size: 40px;
            font-weight: 400;
            margin: 0;
        }

        .logo{
            position: fixed;
            top: 100px;
            left: 100px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
        <h1 class="logo">Eventor</h1>
        <h1>${data.title}</h1>
        <p>${data.description}</p>
        </div>
    </div>
</body>
</body>
</html>`;
}

export default template;