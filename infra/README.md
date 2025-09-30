# DevSecOps Kubernetes Local Cluster Setup 🛠️

This repository demonstrates setting up a local Kubernetes cluster using **Kind**, running inside a **Vagrant-managed Ubuntu VM**, with Docker and DevSecOps tools installed. This environment is ready for deploying applications and testing security scanning, container, and cluster best practices.

---

## Table of Contents

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [VM Provisioning](#vm-provisioning)
* [Installed Tools](#installed-tools)
* [Kubernetes Cluster Setup](#kubernetes-cluster-setup)
* [Verification](#verification)
* [Next Steps](#next-steps)

---

## Overview

This setup provides:

* A reproducible local development environment using **Vagrant** and **VirtualBox**
* Docker environment for building and running containers
* Kubernetes cluster using **Kind** (Kubernetes-in-Docker)
* Basic DevSecOps scanning tools pre-installed
* Default storage class for dynamic PVs

This setup allows you to experiment with **Node.js applications**, **container security**, and **DevSecOps pipelines** locally.

---

## Prerequisites

* [VirtualBox](https://www.virtualbox.org/) installed
* [Vagrant](https://www.vagrantup.com/) installed
* Internet connection (for downloading VM box and packages)
* Optional: `kubectl` locally (for external cluster control)

---

## VM Provisioning

1. Clone this repository:

```bash
git clone <your-repo-url>
cd infra
```

2. Start and provision the VM:

```bash
vagrant up
vagrant ssh
```

3. The `Vagrantfile` provisions:

* Ubuntu 20.04 LTS (`ubuntu/focal64`)
* 4 GB RAM, 2 CPUs
* Synced folder: project root → `/vagrant`
* Forwarded port 3000 (guest → host)

---

## Installed Tools

The following tools are installed automatically via the Vagrant provisioner:

### Containerization & Orchestration

* [Docker](https://www.docker.com/)
* [Kind](https://kind.sigs.k8s.io/) (Kubernetes-in-Docker)
* [kubectl](https://kubernetes.io/docs/tasks/tools/)

### Security / DevSecOps

* [Trivy](https://aquasecurity.github.io/trivy/) – container and image vulnerability scanner
* [Syft](https://anchore.com/syft/) – SBOM generator
* [Cosign](https://sigstore.dev/cosign/) – container signing
* [Gitleaks](https://github.com/zricethezav/gitleaks) – secret detection in git repos
* [nmap](https://nmap.org/) – network scanning tool

### Utilities

* `curl`, `jq`, `gnupg`, `apt-transport-https`

> **Note**: Docker user permissions fixed inside VM to allow non-root access.

---

## Kubernetes Cluster Setup

1. Create a Kind cluster:

```bash
kind create cluster --name devsecops
```

* Cluster uses `kindest/node:v1.27.3` image
* Control-plane node: `devsecops-control-plane`
* Network: `kindnet` CNI installed
* StorageClass: `local-path-provisioner` installed as default

2. Verify cluster nodes:

```bash
kubectl get nodes
```

Output example:

```
NAME                      STATUS   ROLES           AGE   VERSION
devsecops-control-plane   Ready    control-plane   10m   v1.27.3
```

3. Verify system pods:

```bash
kubectl get pods -A
```

Example running pods:

```
NAMESPACE            NAME                                      READY   STATUS    AGE
kube-system          coredns-5d78c9869d-7wzwq                  1/1     Running   1m
kube-system          kube-apiserver-devsecops-control-plane     1/1     Running   1m
local-path-storage   local-path-provisioner-6bc4bddd6b-qf5vq   1/1     Running   1m
```

4. Verify storage class:

```bash
kubectl get storageclass
```

Example:

```
NAME                 PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
standard (default)   rancher.io/local-path   Delete          WaitForFirstConsumer   false                  2m
```

---

## Verification

* Docker works: `docker ps`
* Kind cluster operational: `kubectl cluster-info --context kind-devsecops`
* Core pods running (`coredns`, `etcd`, `kube-apiserver`, `kindnet`, `local-path-provisioner`)
* StorageClass ready for dynamic volume provisioning

---

## Next Steps

1. Deploy sample Node.js or other applications in the cluster
2. Integrate DevSecOps scans:

   * Container image scanning with **Trivy**
   * SBOM generation with **Syft**
   * Secret detection with **Gitleaks**
3. Experiment with Kubernetes manifests, RBAC, and monitoring tools like **Prometheus** and **Grafana**
4. Build CI/CD pipelines with security gates for images and deployments

---

## References

* [Kind – Kubernetes IN Docker](https://kind.sigs.k8s.io/)
* [Vagrant Documentation](https://www.vagrantup.com/docs)
* [Trivy Documentation](https://aquasecurity.github.io/trivy/)
* [Syft Documentation](https://anchore.com/syft/)
* [Cosign Documentation](https://sigstore.dev/cosign/)
* [Gitleaks Documentation](https://github.com/zricethezav/gitleaks)

---

> ⚠️ **Tip:** Always destroy and recreate clusters if experimenting heavily to avoid state issues:

```bash
kind delete cluster --name devsecops
vagrant destroy -f
vagrant up
```
