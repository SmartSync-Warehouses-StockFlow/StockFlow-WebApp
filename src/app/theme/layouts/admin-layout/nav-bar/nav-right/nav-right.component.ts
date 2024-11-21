import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs'; // Para manejar la suscripción

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// icon
import { IconService } from '@ant-design/icons-angular';
import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline
} from '@ant-design/icons-angular/icons';

// Importar el servicio de usuario
import UserService from 'src/app/Service/Userservice';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit, OnDestroy {
  @Input() styleSelectorToggle!: boolean;
  @Output() Customize = new EventEmitter();
  windowWidth: number;
  screenFull: boolean = true;

  username: string | null = 'Guest'; // Valor predeterminado de 'Guest'
  private usernameSubscription!: Subscription; // Suscripción al servicio

  constructor(
    private iconService: IconService,
    private userService: UserService // Inyectar el servicio de usuario
  ) {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
        CheckCircleOutline,
        GiftOutline,
        MessageOutline,
        SettingOutline,
        PhoneOutline,
        LogoutOutline,
        UserOutline,
        EditOutline,
        ProfileOutline,
        QuestionCircleOutline,
        LockOutline,
        CommentOutline,
        UnorderedListOutline,
        ArrowRightOutline,
        BellOutline,
        GithubOutline,
        WalletOutline
      ]
    );
  }

  ngOnInit(): void {
    // Suscribirse a los cambios en el username del servicio
    this.usernameSubscription = this.userService.username$.subscribe((username) => {
      this.username = username || 'Guest'; // Actualizar el username si cambia
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción cuando el componente se destruya
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }

  // Métodos de perfil y configuración como antes
  profile = [
    {
      icon: 'edit',
      title: 'Edit Profile'
    },
    {
      icon: 'user',
      title: 'View Profile'
    }
  ];

  setting = [
    {
      icon: 'question-circle',
      title: 'Support'
    },
    {
      icon: 'user',
      title: 'Account Settings'
    },
  ];
}
