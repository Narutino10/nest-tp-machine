import { Injectable, ConflictException } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  // Pour la démo, on stocke les codes de validation en mémoire
  private validationCodes: { [email: string]: string } = {};
  private twoFACodes: { [email: string]: string } = {};

  constructor(
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  async login(email: string, password: string) {
    const user = this.usersService.findByEmail(email);
    if (!user || user.password !== password) {
      return { success: false, message: 'Identifiants invalides' };
    }
    // Générer un code 2FA
    const code2fa = Math.floor(100000 + Math.random() * 900000).toString();
    this.twoFACodes[email] = code2fa;
    await this.mailService.sendMail({
      to: email,
      subject: 'Code de connexion 2FA',
      text: `Votre code de connexion : ${code2fa}`,
      html: `<p>Votre code de connexion : <b>${code2fa}</b></p>`,
    });
    return { success: true, message: 'Code 2FA envoyé par email' };
  }

  validate2FA(email: string, code: string) {
    const expected = this.twoFACodes[email];
    if (!expected) {
      return {
        success: false,
        message: 'Aucune demande de connexion en attente pour cet email.',
      };
    }
    if (expected !== code) {
      return { success: false, message: 'Code 2FA invalide.' };
    }
    delete this.twoFACodes[email];
    // Ici tu pourrais retourner un JWT ou la session utilisateur
    return { success: true, message: 'Connexion validée.' };
  }

  async register(email: string, password: string) {
    // Vérifier si l'utilisateur existe déjà
    const existing = this.usersService.findByEmail(email);
    if (existing) throw new ConflictException('Email déjà utilisé');

    // Créer l'utilisateur (mot de passe non hashé pour la démo)
    this.usersService.create(email, password);

    // Générer un code de validation
    const validationToken = Math.random().toString(36).substring(2, 8);
    this.validationCodes[email] = validationToken;

    // Envoyer l'email de confirmation
    await this.mailService.sendMail({
      to: email,
      subject: 'Confirme ton inscription',
      text: `Bienvenue ! Voici ton code de validation : ${validationToken}`,
      html: `<p>Bienvenue ! Voici ton code de validation : <b>${validationToken}</b></p>`,
    });

    return { message: 'Inscription en attente de validation email' };
  }

  validateEmail(email: string, code: string) {
    const expected = this.validationCodes[email];
    if (!expected) {
      return {
        success: false,
        message: 'Aucune inscription en attente pour cet email.',
      };
    }
    if (expected !== code) {
      return { success: false, message: 'Code invalide.' };
    }
    // Ici tu pourrais marquer l'utilisateur comme "validé" (à faire si tu ajoutes un champ dans User)
    delete this.validationCodes[email];
    return { success: true, message: 'Email validé avec succès.' };
  }
}
