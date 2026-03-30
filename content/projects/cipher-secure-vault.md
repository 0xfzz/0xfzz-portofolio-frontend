---
title: "Cipher Secure Vault"
shortDescription: "End-to-end encrypted secret management utility for CLI-first developer workflows."
description: "Cipher Secure Vault creates decentralized, easily sharable, yet heavily encrypted environment variables for developer teams."
image: "https://picsum.photos/seed/cipher-secure/1600/900"
role: "Security Engineer"
timeline: "Feb 2022 - Aug 2022"
technologies: ["Rust", "Cryptography", "CLI", "AWS KMS"]
githubUrl: "https://github.com/example/cipher-vault"
slug: "cipher-secure-vault"
featured: false
published: true
---

## Abstract

Developers constantly accidentally commit `.env` files to source control or insecurely share them across messaging apps. Cipher fixes this.

## How it works

Cipher relies on an abstraction of envelope encryption. 

1. Local files are aggressively encrypted locally using high-speed ChaCha20-Poly1305 utilizing a dynamically generated Data Encryption Key (DEK).
2. The DEK itself is then encrypted using an asymmetrical secure Key Encryption Key (KEK) typically residing in AWS KMS or a similarly secure hardware vault.
3. Only the heavily encrypted payload and encrypted DEK are stored or transmitted.

```rust
// Core encryption logic module
pub fn encrypt_payload(data: &[u8], dek: &[u8]) -> Result<Vec<u8>, Error> {
    let cipher = ChaCha20Poly1305::new(Key::from_slice(dek));
    let nonce = ChaCha20Poly1305::generate_nonce(&mut OsRng); // securely generated
    
    // In production we utilize AAD tightly coupled to the user identity.
    cipher.encrypt(&nonce, data.as_ref())
}
```

## Security Posture

We underwent intense third-party security audits prior to release to ensure memory leak prevention and robust key-generation procedures. Zero vulnerabilities were found relating to key extraction or algorithmic fallback.
