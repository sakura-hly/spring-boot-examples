import React from "react";
import Login from "./Login";

const A = () => {
    return (<h2>AAA</h2>);
}
const B = () => {
    return (<h2>BBB</h2>);
}
const C = () => {
    return (<h2>CCC</h2>);
}

export default [
    { path: "/", name: "A", component: A, auth: true },
    { path: "/a", name: "A", component: A, auth: true },
    { path: "/b", name: "B", component: B, auth: true },
    { path: "/c", name: "C", component: C, auth: true },
    { path: "/login", name: "Login", component: Login },
  ]