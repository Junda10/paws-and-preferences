
# 🐾 Paws and Preferences

A playful React app that lets you swipe through random cat images, “like” or “dislike” them, and view your swiping history. Built with [Create React App](https://create-react-app.dev/), [Framer Motion](https://www.framer.com/motion/), and the [Cataas API](https://cataas.com/).

---

## ✨ Features

- Swipe left or right to “dislike” or “like” each cat
- Undo your last swipe at any time
- See your liked/disliked cats in a stylish sidebar history
- Animated card swipes with Framer Motion
- Easy to deploy to GitHub Pages

---

## 🚀 Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/paws-and-preferences.git
cd paws-and-preferences
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Run the app locally**

```bash
npm start
```

App will be available at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Deployment (GitHub Pages)

1. **Set the `homepage` field in `package.json`:**
    ```json
    "homepage": "https://YOUR_USERNAME.github.io/paws-and-preferences"
    ```

2. **Deploy:**
    ```bash
    npm run deploy
    ```
    This will build the app and publish it to the `gh-pages` branch.  
    View it at:  
    ```
    https://YOUR_USERNAME.github.io/paws-and-preferences/
    ```

---

## 🌐 API

This app fetches images from [Cataas](https://cataas.com/), the “Cat as a Service” API.

---

## 📁 Project Structure

```
paws-and-preferences/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── SwipeDeck.js
│   ├── services/
│   │   └── cataas.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## 🙏 Credits

- [Cataas.com](https://cataas.com/) for adorable cat photos
- [Framer Motion](https://framer.com/motion) for animations
- [React](https://reactjs.org/)

---

## 📜 License

MIT License (see [LICENSE](LICENSE) file).

---

## 🐱 Enjoy swiping cats!

Feel free to fork, improve, and have fun!
