<?php
$host="localhost";
$user="root";
$password="";
$db="foodbank";

$conn = mysqli_connect($host, $user, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if(isset($_POST['submitLogin'])){
    $uname = $_POST['loginUsername'];
    $upass = md5($_POST['loginPassword']);

    $sql="SELECT * FROM useracc WHERE UserID = '$uname' AND Password = '$upass'; ";

    $result = mysqli_query($conn, $sql);
    if(mysqli_num_rows($result)==1){
        echo "Successful Logged In";
        exit();
    } else {
        echo "Incorrect ID or Password";
        exit();
    }
}

if(isset($_POST['submitRegister'])){
    $uname = $_POST['registerUsername'];
    $upass = md5($_POST['registerPassword']);
    $email = $_POST['registerEmail'];
    $sql = "INSERT INTO useracc (UserID, Password, Email) VALUES ('$uname', '$upass', '$email');";
    $result = mysqli_query($conn, $sql);
}

?>

<!DOCTYPE html>
<html>
    <head>
        <title>FoodBank</title>
        <!<link href="style/nightlyMode.min.css" rel="stylesheet">
        <link href="style/loginStyle.css" rel="stylesheet">
        <script src="script/OpenLayers.js"></script>
    </head>

    <body>
        <div class="hero">
            <div class="form-box">
                <div class="button-box">
                    <div id="button"></div>
                        <button type="button" class="toggle-button" onclick="login()">Log In</button>
                        <button type="button" class="toggle-button" onclick="register()">Register</button>
                </div>

                <div class="social-icons">
                    <img src="images/fb.png">
                    <img src="images/gp.png">
                    <img src="images/tw.png">
                </div>

                <form method="POST" action="#" id="login" class="input-group">
                    <input type="text" name="loginUsername" class="input-field" placeholder="User ID" required>
                    <input type="password" name="loginPassword" class="input-field" placeholder="Password" required>
                    <input type="checkbox" name="rememberMeBtn" class="check-box"><span>Remember me</span>
                    <button type = "submit" name = "submitLogin" class="submit-button">Log In</button>
                </form>

                <form method="POST" action="#" id="register" class="input-group">
                    <input type="text" name="registerUsername" class="input-field" placeholder="User ID" required>
                    <input type="email" name="registerEmail" class="input-field" placeholder="Email ID" required>
                    <input type="password" name="registerPassword" class="input-field" placeholder="Password" required>
                    <input type="checkbox" name="tncCheck" class="check-box" required><span>I agree to the terms and condition.</span>
                    <button type = "submit" name = "submitRegister" class="submit-button">Register</button>
                </form>
            </div>
        </div> 

        <script>
            var x = document.getElementById("login");
            var y = document.getElementById("register");
            var z = document.getElementById("button");

            function register(){
                x.style.left = "-450px";
                y.style.left = "50px";
                z.style.left = "110px";
            }

            function login(){
                x.style.left = "50px";
                y.style.left = "450px";
                z.style.left = "0px";
            }
        </script>
    </body>
</html>