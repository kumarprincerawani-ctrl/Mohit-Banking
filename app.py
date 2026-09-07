from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)

# Demo secret key
app.secret_key = "mohit-banking-demo-key"


# =========================================================
# DEMO USER DATA
# =========================================================

USER = {
    "name": "Mohit Kumar",
    "first_name": "Mohit",
    "last_name": "Kumar",
    "email": "mohit@example.com",
    "username": "mohit",
    "account": "XXXX XXXX 4582",
    "balance": 125680.50
}


# =========================================================
# DEMO TRANSACTIONS
# =========================================================

transactions = [
    {
        "title": "Salary Credit",
        "date": "07 Sep 2026",
        "type": "credit",
        "amount": 45000.00
    },
    {
        "title": "Online Shopping",
        "date": "06 Sep 2026",
        "type": "debit",
        "amount": 2499.00
    },
    {
        "title": "Electricity Bill",
        "date": "04 Sep 2026",
        "type": "debit",
        "amount": 1850.00
    },
    {
        "title": "Money Received",
        "date": "02 Sep 2026",
        "type": "credit",
        "amount": 5000.00
    }
]


# =========================================================
# DEMO USERS FOR ADMIN
# =========================================================

users = [
    {
        "name": "Mohit Kumar",
        "email": "mohit@example.com",
        "account": "XXXX XXXX 4582",
        "status": "Active"
    },
    {
        "name": "Rahul Sharma",
        "email": "rahul@example.com",
        "account": "XXXX XXXX 1245",
        "status": "Active"
    },
    {
        "name": "Aman Singh",
        "email": "aman@example.com",
        "account": "XXXX XXXX 8932",
        "status": "Pending"
    }
]


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():
    return render_template("index.html")


# =========================================================
# LOGIN
# =========================================================

@app.route("/login", methods=["GET", "POST"])
def login():

    error = None

    if request.method == "POST":

        username = request.form.get("username")
        password = request.form.get("password")

        # Demo login
        if username == "mohit" and password == "1234":

            session["logged_in"] = True
            session["username"] = "mohit"

            return redirect(url_for("dashboard"))

        else:
            error = "Invalid username or password."

    return render_template(
        "login.html",
        error=error
    )


# =========================================================
# REGISTER
# =========================================================

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        email = request.form.get("email")
        username = request.form.get("username")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")

        # Basic demo validation
        if password != confirm_password:

            return render_template(
                "register.html",
                error="Passwords do not match."
            )

        # Demo registration
        return redirect(url_for("login"))

    return render_template("register.html")


# =========================================================
# LOGOUT
# =========================================================

@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("home"))


# =========================================================
# LOGIN CHECK
# =========================================================

def login_required():

    return session.get("logged_in", False)


# =========================================================
# DASHBOARD
# =========================================================

@app.route("/dashboard")
def dashboard():

    if not login_required():

        return redirect(url_for("login"))

    return render_template(
        "dashboard.html",
        user=USER,
        transactions=transactions
    )


# =========================================================
# TRANSACTIONS
# =========================================================

@app.route("/transactions")
def transaction_page():

    if not login_required():

        return redirect(url_for("login"))

    return render_template(
        "transactions.html",
        user=USER,
        transactions=transactions
    )


# =========================================================
# TRANSFER
# =========================================================

@app.route("/transfer", methods=["GET", "POST"])
def transfer():

    if not login_required():

        return redirect(url_for("login"))

    message = None
    error = None

    if request.method == "POST":

        recipient = request.form.get("recipient")
        amount = request.form.get("amount")

        try:

            amount = float(amount)

            if amount <= 0:

                error = "Please enter a valid amount."

            elif amount > USER["balance"]:

                error = "Insufficient demo balance."

            else:

                USER["balance"] -= amount

                transactions.insert(
                    0,
                    {
                        "title": f"Transfer to {recipient}",
                        "date": "Today",
                        "type": "debit",
                        "amount": amount
                    }
                )

                message = "Demo transfer completed successfully."

        except (ValueError, TypeError):

            error = "Please enter a valid amount."

    return render_template(
        "transfer.html",
        user=USER,
        message=message,
        error=error
    )


# =========================================================
# PROFILE
# =========================================================

@app.route("/profile")
def profile():

    if not login_required():

        return redirect(url_for("login"))

    return render_template(
        "profile.html",
        user=USER
    )


# =========================================================
# SETTINGS
# =========================================================

@app.route("/settings")
def settings():

    if not login_required():

        return redirect(url_for("login"))

    return render_template(
        "settings.html",
        user=USER
    )


# =========================================================
# ADMIN PANEL
# =========================================================

@app.route("/admin")
def admin():

    # Demo admin page
    return render_template(
        "admin.html",
        users=users
    )


# =========================================================
# 404 PAGE
# =========================================================

@app.errorhandler(404)
def page_not_found(error):

    return """
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/">Go Home</a>
    """, 404


# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )