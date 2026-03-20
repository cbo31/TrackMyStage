# TrackMyStage

Application web permettant de gérer et suivre ses candidatures de stage.

## 🚀 Contexte

Ce projet a débuté comme une application frontend en React, avec pour objectif de découvrir la création d’interfaces dynamiques et la gestion d’état.

L’idée initiale était de pouvoir gérer ses candidatures à travers deux vues principales :
- une vue globale (liste des candidatures)
- une vue détaillée par candidature

Dans un premier temps, les données étaient simulées (fichier JavaScript puis "fake backend"), avant de faire évoluer progressivement le projet vers une architecture plus complète.

## 🛠️ Évolutions

Le projet a ensuite été étendu avec une véritable partie backend développée en Django, permettant de :

- structurer une API
- gérer les données de manière dynamique
- connecter le frontend à un backend réel

Cette évolution m’a permis de passer d’un frontend isolé à une application fullstack complète.

## ✨ Fonctionnalités

- Authentification utilisateur (login / register)
- Création et gestion de candidatures
- Suivi des statuts
- Navigation entre vues (liste / détail)
- Interface utilisateur moderne

## 🧰 Stack technique

- Frontend : React
- Backend : Django + Django REST Framework
- Routing : React Router
- Base de données : (à préciser si besoin)
- CI/CD : GitHub Actions
- Containerisation : Docker

## 🎓 Apports de la formation

Ce projet s’inscrit dans le cadre de ma formation en développement d’applications, au cours de laquelle j’ai acquis des bases solides en développement web.

Il m’a permis de mettre en pratique concrètement :

- le développement d’interfaces avec React
- la conception d’API avec Django
- la gestion de la communication frontend / backend
- la structuration d’une application fullstack

Au-delà des notions vues en formation, ce projet a été l’occasion d’aller plus loin en faisant évoluer progressivement l’architecture, notamment avec l’ajout d’un backend réel et d’une gestion des données dynamique.

## 🧠 Architecture (simplifiée)

Frontend (React) → API REST (Django) → Base de données

## 🚀 Déploiement

- Dockerisation de l’application (frontend + backend)
- Mise en place d’un pipeline CI/CD avec GitHub Actions
- Déploiement automatisé sur serveur

## 📸 Screenshots

(en développemet)

## 🔗 Installation

### Frontend

```bash
git clone ...
npm install
npm start
```

### backend
```bash
cd backend
python manage.py runserver