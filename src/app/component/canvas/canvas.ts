import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Network } from 'vis-network/standalone';
import { DataSet } from 'vis-data';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.html',
  styleUrl: './canvas.css',
})
export class Canvas implements AfterViewInit {
  @ViewChild('automatoCanvas') container!: ElementRef;

  network: any;
  nodes: any;
  edges: any;
  nodeIdCounter = 0;

  initialStateId: any = null;
  resultStatus: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => { if (this.container) this.initNetwork(); }, 100);
    }
  }

  initNetwork() {
    this.nodes = new DataSet([]);
    this.edges = new DataSet([]);

    const data = { nodes: this.nodes, edges: this.edges };

    const options = {
      physics: false,
      edges: {
        font: { align: 'top', size: 16, strokeWidth: 0, background: 'white' }, // Texto com fundo branco pra ler melhor
        smooth: { enabled: true, type: 'continuous', roundness: 0.5 },
        arrows: { to: { enabled: true } }
      },
      manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: false, // Usamos nosso botão
        deleteNode: true,
        deleteEdge: true,

        // --- AQUI ESTÁ A MÁGICA ---
        // Quando o usuário soltar a seta, essa função roda:
        addEdge: (edgeData: any, callback: any) => {
          const label = prompt("Digite o símbolo da transição (ex: 0 ou 1):");

          if (label !== null && label.trim() !== "") {
            edgeData.label = label; // Define o texto da seta
            callback(edgeData);     // Confirma a criação
          } else {
            callback(null);         // Cancela se não digitar nada
          }
        },

        // Permite editar clicando no botão "Edit Edge" da barra
        editEdge: (edgeData: any, callback: any) => {
          const label = prompt("Alterar símbolo para:", edgeData.label);

          if (label !== null) {
            edgeData.label = label;
            callback(edgeData);
          } else {
            callback(null);
          }
        }
      },
      interaction: {
        dragNodes: true,
        hover: true
      }
    };

    this.network = new Network(this.container.nativeElement, data, options);
  }

  // --- FUNÇÕES DE BOTÕES (IGUAIS A ANTES) ---

  addState() {
    if (!this.nodes) return;
    const id = this.nodeIdCounter++;
    const isFirst = this.nodes.length === 0;

    this.nodes.add({
      id: id,
      label: `q${id}`,
      color: { background: isFirst ? '#97C2FC' : '#FFFF00', border: '#2B7CE9' },
      borderWidth: 1,
      shape: 'circle',
      x: (Math.random() * 300) - 150,
      y: (Math.random() * 300) - 150
    });

    if (isFirst) this.initialStateId = id;
  }

  toggleFinal() {
    const selected = this.network.getSelectedNodes();
    if (selected.length === 0) return alert('Selecione um estado primeiro!');
    const nodeId = selected[0];
    const node = this.nodes.get(nodeId);
    const isFinal = node.borderWidth === 3;

    this.nodes.update({
      id: nodeId,
      borderWidth: isFinal ? 1 : 3,
      color: { border: isFinal ? '#2B7CE9' : '#FF0000' }
    });
  }

  setInitial() {
    const selected = this.network.getSelectedNodes();
    if (selected.length === 0) return alert('Selecione um estado primeiro!');
    const newInitialId = selected[0];

    if (this.initialStateId !== null) {
      this.nodes.update({ id: this.initialStateId, color: { background: '#FFFF00' } });
    }
    this.initialStateId = newInitialId;
    this.nodes.update({ id: newInitialId, color: { background: '#97C2FC' } });
  }

  clearAll() {
    if(this.nodes) this.nodes.clear();
    if(this.edges) this.edges.clear();
    this.nodeIdCounter = 0;
    this.initialStateId = null;
    this.resultStatus = '';
  }

  testInput(word: string) {
    if (this.initialStateId === null) {
      alert('Defina um estado inicial primeiro!');
      return;
    }

    let currentState = this.initialStateId;
    this.resultStatus = 'Processando...';
    this.network.selectNodes([currentState]);

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      const connectedEdgeIds = this.network.getConnectedEdges(currentState);
      const allEdges = this.edges.get(connectedEdgeIds);

      // Busca a seta correta
      const transition = allEdges.find((e: any) => e.from === currentState && e.label === char);

      if (!transition) {
        this.resultStatus = 'Rejeitado';
        return;
      }
      currentState = transition.to;
    }

    const finalNode = this.nodes.get(currentState);
    if (finalNode.borderWidth === 3) {
      this.resultStatus = 'Aceito';
    } else {
      this.resultStatus = 'Rejeitado';
    }
    this.network.selectNodes([currentState]);
  }
}
